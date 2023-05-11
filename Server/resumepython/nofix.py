import pandas as pd

# Read the dataset or table into a pandas DataFrame
df = pd.read_csv('parsed_resume_dataset.csv')

# Replace column 2 values with "WOLF,HUNTING,KILLERBEE" for rows where column 3 is "no"
df.loc[df['Match'] == 'No', 'Requirements'] = 'WOLF,HUNTING,KILLERBEE'

# Write the updated DataFrame back to a CSV file or database table
df.to_csv('my_updated_dataset.csv', index=False)
