import pandas as pd
import numpy as np
import PyPDF2
from keras.preprocessing.text import Tokenizer
from keras.utils import pad_sequences
from keras.models import Sequential
from keras.layers import Dense, Embedding, LSTM, GRU
from keras.callbacks import EarlyStopping, ModelCheckpoint
import en_core_web_sm

nlp = en_core_web_sm.load()

def train_model(train_data_path):
    # Load the training data into a Pandas dataframe
    train_data = pd.read_csv(train_data_path)

    # Extract the text from the PDF resumes
    train_data["Resume"] = train_data["Resume"].apply(lambda x: extract_pdf_text(x))
    # Preprocess the requirements data
    train_data["Requirements"] = train_data["Requirements"].str.lower()
    requirements = train_data["Requirements"].str.split(",")
    requirements = requirements.apply(lambda x: [r.strip() for r in x])

    # Create a binary matrix indicating which requirements are met by each resume
    requirement_labels = []
    for i in range(len(requirements)):
        row = [0] * len(set(requirements.sum()))
        for requirement in requirements.iloc[i]:
            if requirement in set(requirements.sum()):
                row[list(set(requirements.sum())).index(requirement)] = 1
        requirement_labels.append(row)

    # Preprocess the text data
    tokenizer = Tokenizer(num_words=1000)
    tokenizer.fit_on_texts(train_data["Resume"])
    text_seq = tokenizer.texts_to_sequences(train_data["Resume"])
    text_pad = pad_sequences(text_seq, maxlen=1000)

    # Define the neural network architecture
    model = Sequential()
    model.add(Embedding(1000, 128, input_length=1000))
    model.add(LSTM(64, dropout=0.2, recurrent_dropout=0.2))
    model.add(Dense(len(set(requirements.sum())), activation="sigmoid"))
    model.compile(loss="binary_crossentropy", optimizer="adam", metrics=["accuracy"])

    # Train the model
    early_stopping = EarlyStopping(monitor="val_loss", patience=5)
    checkpoint = ModelCheckpoint("model.h5", save_best_only=True)
    model.fit(text_pad, np.array(requirement_labels), validation_split=0.1, epochs=100, callbacks=[early_stopping, checkpoint])

def extract_pdf_text(path):
    with open(path, "rb") as file:
        reader = PyPDF2.PdfReader(file)
        text = ""
        for page in reader.pages:
            text += page.extract_text()
        doc = nlp(text)
        # Extract skills from the parsed text
        skills = []
        for entity in doc.ents:
            if entity.label_ in ["SKILL", "EDUCATION", "EXPERIENCE", "AWARD", "LANGUAGE", "PROJECT", "ORG", "GPE","ACHIEVEMENTS"]:
                skills.append(entity.text.strip())
        text=",".join(skills)
        print(text)
    return text


# Example usage
train_model(r"C:\Users\DELL\Documents\GitHub\mern_stack_course-main\mern_stack_course-main\resumepython\my_updated_dataset.csv")

