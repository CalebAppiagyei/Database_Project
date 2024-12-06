import pandas as pd
import matplotlib.pyplot as plt
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
import os

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

# Function to create a bar chart and save it to a PDF
def save_bar_chart_as_pdf(df, filename="player_comparison.pdf"):
    # Create a bar chart
    fig, ax = plt.subplots(figsize=(10, 7))
    width = 0.35  # width of the bars

    # Set positions of bars on the x-axis
    x = range(len(df))

    # Plot the data for both players
    ax.bar([p - width/2 for p in x], df['George Pickens'], width, label='George Pickens', color='blue')
    ax.bar([p + width/2 for p in x], df['Justin Herbert'], width, label='Justin Herbert', color='orange')

    # Add labels and title
    ax.set_ylabel('Stats')
    ax.set_title('Player Comparison: George Pickens vs Justin Herbert')
    ax.set_xticks(x)
    ax.set_xticklabels(df['Stat'], rotation=90)
    ax.legend()

    # Save the plot as a temporary PNG file
    chart_filename = "player_comparison_chart.png"
    plt.tight_layout()
    plt.savefig(chart_filename, format='png')
    plt.close(fig)

    # Create a canvas for PDF generation
    c = canvas.Canvas(filename, pagesize=letter)
    width, height = letter

    # Add the image to the PDF
    c.drawImage(chart_filename, 50, height - 500, width=500, height=300)

    # Save the PDF
    c.save()

    # Delete the temporary PNG file after adding to PDF
    os.remove(chart_filename)

# Save the bar chart as a PDF
save_bar_chart_as_pdf(df)
