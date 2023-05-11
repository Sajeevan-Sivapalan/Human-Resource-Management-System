import pandas as pd
import numpy as np
import PyPDF2
from keras.preprocessing.text import Tokenizer
from keras.utils import pad_sequences
from keras.models import load_model

# Load the pre-trained model
model = load_model("model.h5")

def extract_pdf_text(path):
    with open(path, "rb") as file:
        reader = PyPDF2.PdfReader(file)
        text = ""
        for page in reader.pages:
            text += page.extract_text()
    print(text)        
    return text


def preprocess_text(text):
    # Preprocess the text data
    tokenizer = Tokenizer(num_words=1000)
    tokenizer.fit_on_texts([text])
    text_seq = tokenizer.texts_to_sequences([text])
    text_pad = pad_sequences(text_seq, maxlen=1000)
    return text_pad

def predict_match(text, job_description):
    # Preprocess the resume text
    text_pad = preprocess_text(text)

    # Preprocess the job description data
    job_description = job_description.lower()
    requirements = job_description.split(",")
    requirements = [r.strip() for r in requirements]

    # Create a binary matrix indicating which requirements are met by the resume
    requirement_labels = [0] * len(set(requirements))
    for requirement in requirements:
        if requirement in set(requirements):
            requirement_labels[list(set(requirements)).index(requirement)] = 1

    # Make predictions on the resume text
    predictions = model.predict(text_pad)
    predicted_labels = (predictions > 0.5).astype(int)[0]

    # Compare the predicted labels to the job description labels
    if(predicted_labels.all()>0):
        match = all([predicted_labels[i] == requirement_labels[i] for i in range(len(predicted_labels))])
    else:
        match=0
    

    return match


text = extract_pdf_text("PaulMcarthyResume.pdf")
job_description = "E n g l i s h,N a t i v e,F r e n c h,A d v a n c e d,G e r m a n,I n t e r m e d i a t e"
match = predict_match(text, job_description)
print(match)
