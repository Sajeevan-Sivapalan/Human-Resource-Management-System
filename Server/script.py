import sys
import pandas as pd
import numpy as np
import PyPDF2
import spacy
from spacy.matcher import Matcher
import re
import keras
from sklearn.model_selection import train_test_split
from keras.optimizers import Adam
from keras.preprocessing.text import Tokenizer
from keras.utils import pad_sequences
from keras.layers import Embedding, LSTM, Dense, Dropout
from keras.models import Sequential
from keras.callbacks import EarlyStopping, ModelCheckpoint
from keras import regularizers
from gensim.models import KeyedVectors
import pickle
from keras.models import load_model
import requests
import io



# Load the pre-trained spacy model
nlp = spacy.load('en_core_web_sm')

# Extract skills from the parsed text
def extract_skills(doc):
    skills = []
    for entity in doc.ents:
        if entity.label_ in ["SKILL", "EDUCATION", "EXPERIENCE", "AWARD", "LANGUAGE", "PROJECT", "ORG", "GPE","ACHIEVEMENTS"]:
            skills.append(entity.text.strip())
    return skills

# Extract text from PDF file
def extract_pdf_text(path):
    reader = PyPDF2.PdfReader(io.BytesIO(path))
    text = ""
    for page in reader.pages:
        text += page.extract_text()
    doc = nlp(text)
    # Extract skills from the parsed text
    skills = extract_skills(doc)
    text=",".join(skills)
    return text

def train_model(dataset_path):
    # Load the dataset
    dataset = pd.read_csv(dataset_path)

    # Remove rows with empty values
    dataset.dropna(axis=0, how='any', inplace=True)

    # Pre-process the text data
    requirements = dataset['Requirements'].tolist()
    requirements = [re.sub(r'[^\w\s]', '', str(req)) for req in requirements]

    # Tokenize the text data
    tokenizer = Tokenizer()
    tokenizer.fit_on_texts(requirements)
    word_index = tokenizer.word_index
    vocab_size = len(word_index) + 1
    sequences = tokenizer.texts_to_sequences(requirements)
    max_length = max([len(seq) for seq in sequences])
    text_pad = pad_sequences(sequences, maxlen=max_length, padding='post')

    # Prepare the labels
    requirement_labels = []
    for label in dataset['Match']:
        if label == 'Yes':
            requirement_labels.append(1)
        else:
            requirement_labels.append(0)

    # Split the dataset into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(text_pad, np.array(requirement_labels), test_size=0.5, random_state=42)

    # Load the pre-trained word embeddings
    word_vectors = KeyedVectors.load_word2vec_format(r"D:\\AYU\\tutorialexcercises\\django\\mern_stack_course-main\\lesson_13-backend\\GoogleNews-vectors-negative300.bin", binary=True)

    # Create the embedding matrix
    embedding_dim = 300
    embedding_matrix = np.zeros((vocab_size, embedding_dim))
    for word, i in word_index.items():
        if word in word_vectors.key_to_index:
            embedding_matrix[i] = word_vectors.word_vec(word)

    # Create the model
    model = Sequential()
    model.add(Embedding(vocab_size, embedding_dim, weights=[embedding_matrix], input_length=max_length, trainable=False))
    model.add(LSTM(256, dropout=0.2, recurrent_dropout=0.2, return_sequences=True))
    model.add(LSTM(128, dropout=0.2, recurrent_dropout=0.2))
    model.add(Dense(64, activation='relu', kernel_regularizer=regularizers.l2(0.001)))
    model.add(Dropout(0.2))
    model.add(Dense(1, activation='sigmoid'))
    
    adam = Adam(learning_rate=0.001)
    model.compile(optimizer=adam, loss='binary_crossentropy', metrics=['accuracy'])

    # Define callbacks
    early_stopping = EarlyStopping(monitor='val_loss', patience=5)
    checkpoint = ModelCheckpoint("best_model.hdf5", monitor='val_accuracy', save_best_only=True, mode='max')

    # Train the model
    model.fit(X_train, y_train, validation_split=0.1, epochs=50, callbacks=[early_stopping, checkpoint])

    # Evaluate the model on the testing set
    _, accuracy = model.evaluate(X_test, y_test)
    print("Accuracy: %.2f%%" % (accuracy * 100))
    print(max_length)
    with open('tokenizer.pickle', 'wb') as handle:
        pickle.dump(tokenizer, handle, protocol=pickle.HIGHEST_PROTOCOL)
    return model, tokenizer, max_length

def test_model(model, tokenizer, max_length, test_data_path, requirements):

    # Extract text from the resume
    text = extract_pdf_text(test_data_path)
    #print(f"\nTesting resume {index+1}:")
    #print(text)        
    # Pre-process the text data
    text = re.sub(r'[^\w\s]', '', text)
    text_sequence = tokenizer.texts_to_sequences([text])
    text_pad = pad_sequences(text_sequence, maxlen=max_length, padding='post')

    # Predict the match for the resume
    prediction = model.predict(text_pad)[0][0]
    if prediction > 0.5:
        match = "Yes"
    else:
        match = "No"

    # Pre-process the requirements
    requirements = [re.sub(r'[^\w\s]', '', str(req)) for req in requirements]
    sequences = tokenizer.texts_to_sequences(requirements)
    requirements_pad = pad_sequences(sequences, maxlen=max_length, padding='post')

    # Predict the match for each requirement and check if all match
    for i in range(requirements_pad.shape[0]):
        requirement_prediction = model.predict(requirements_pad[i:i+1])[0][0]
        if requirement_prediction < 0.5:
            print("Requirement", i+1, "does not match")
            match = "No"
            break

    if match == "Yes":
        print(1)
    else:
        print(0)



#model, tokenizer, max_length = train_model(r"g:\resumepython\my_updated_dataset.csv")
# model, tokenizer, max_length = train_model(r"g:\resumepython\parsed_resume_dataset.csv")
with open(r'tokenizer.pickle', 'rb') as handle:
    tokenizer = pickle.load(handle)
model = load_model('best_model.hdf5')
#model, tokenizer, max_length = train_model(r"D:\\AYU\\tutorialexcercises\django\\mern_stack_course-main\\lesson_13-backend\\resumepython\\train_data.csv")
#resume_path = r"D:\\AYU\\tutorialexcercises\\django\\mern_stack_course-main\\lesson_13-backend\\resumepython\\my_updated_dataset.csv"
#requirements = ["P,Healthcare Business Analyst,Healthcare Business Analyst,FL Lessard,Junior Healthcare Business Analyst,TX Bolt,TX,Assisted,Business Analysis,Data Science,Healthcare Industry,eCornell,Coursera,SQL Power BI,EDUCATION,M.S. Business Analytics University of Houston,Dallas,TX,B.S. Business Administration University at Buffalo Buﬀalo,NY,Data Visualization Able,eHealthcare Business Analyst,linkedin.com/in/carolinemadden,Miami,MADDEN"]
requirements = sys.argv[2]
requirements_list = requirements.split(',')
requirements_string = ", ".join(requirements_list)
url = sys.argv[1]
response = requests.get(url)
file_content = response.content
requirements=[requirements_string]

test_model(model, tokenizer, 4, file_content, requirements)
#test_model(model, tokenizer, 4, resume_path,requirements)
#test_model2(resume_path, requirements)