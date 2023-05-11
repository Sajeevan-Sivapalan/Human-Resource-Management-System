import pandas as pd
import PyPDF2
import spacy
import en_core_web_sm
import random
import os

nlp = en_core_web_sm.load()

# Function to extract text from PDF file
def extract_pdf_text(path):
    with open(path, "rb") as file:
        reader = PyPDF2.PdfReader(file)
        text = ""
        for page in reader.pages:
            text += page.extract_text()
    return text

# Load the dataset with resumes
resume_df = pd.read_csv("train_data.csv")

# Create an empty dataframe to store the parsed resumes and requirements
parsed_resume_df = pd.DataFrame(columns=["Resume", "Requirements", "Match"])

# Iterate over each row in the resume dataset
for index, row in resume_df.iterrows():
    # Extract text from PDF file
    resume_text = extract_pdf_text(row["Resume"])
    # Parse the resume text using spacy
    doc = nlp(resume_text)
    # Extract skills from the parsed text
    skills = []
    for entity in doc.ents:
        if entity.label_ in ["SKILL", "EDUCATION", "EXPERIENCE", "AWARD", "LANGUAGE", "PROJECT", "ORG", "GPE","ACHIEVEMENTS"]:
            skills.append(entity.text.strip())
    # Randomize the matching of requirements
    match = "Yes" if random.random() < 0.8 else "No"

    # Create a row for the parsed resume and requirements
    parsed_resume_row = {"Resume": row["Resume"], "Requirements": ", ".join(skills), "Match": match}
    # Add the row to the parsed_resume_df dataframe
    parsed_resume_df = parsed_resume_df.append(parsed_resume_row, ignore_index=True)

# Save the parsed resume and requirements dataframe to a CSV file
parsed_resume_df.to_csv("parsed_resume_dataset.csv", index=False, escapechar='\\')
