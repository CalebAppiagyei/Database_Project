import pandas as pd
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas

# Sample JSON data
player1_stats = {
    "completions": 0,
    "fumbles": 0.25,
    "interceptions": 0,
    "misc_tds": 0,
    "pass_attempts": 0,
    "passing_tds": 0,
    "passing_yds": 0,
    "receiving_tds": 0,
    "receiving_yds": 71,
    "receptions": 5,
    "rush_attempts": 0.25,
    "rushing_tds": 0,
    "rushing_yds": -2.5,
    "targets": 7.25,
}

player2_stats = {
    "completions": 12,
    "fumbles": 1,
    "interceptions": 0,
    "misc_tds": 0,
    "pass_attempts": 18,
    "passing_tds": 1,
    "passing_yds": 125,
    "receiving_tds": 0,
    "receiving_yds": 0,
    "receptions": 0,
    "rush_attempts": 1,
    "rushing_tds": 0,
    "rushing_yds": 0,
    "targets": 0,
}

# Convert the stats into a pandas DataFrame
df = pd.DataFrame({
    'Stat': list(player1_stats.keys()),
    'George Pickens': list(player1_stats.values()),
    'Justin Herbert': list(player2_stats.values())
})

# Function to save the table as a PDF
def save_table_as_pdf(df, filename="player_comparison.pdf"):
    c = canvas.Canvas(filename, pagesize=letter)
    width, height = letter
    
    # Table header
    c.setFont("Helvetica", 12)
    c.drawString(100, height - 40, "Player Comparison Table")
    
    # Add table columns
    x_offset = 50
    y_offset = height - 60
    c.drawString(x_offset, y_offset, "Stat")
    c.drawString(x_offset + 200, y_offset, "George Pickens")
    c.drawString(x_offset + 400, y_offset, "Justin Herbert")
    
    # Table rows
    for i, row in df.iterrows():
        y_offset -= 20
        c.drawString(x_offset, y_offset, row['Stat'])
        c.drawString(x_offset + 200, y_offset, str(row['George Pickens']))
        c.drawString(x_offset + 400, y_offset, str(row['Justin Herbert']))
        
    c.save()

# Save the table as a PDF
save_table_as_pdf(df)
