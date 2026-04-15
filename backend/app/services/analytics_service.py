import pandas as pd

def process_data(data, start=None, end=None):
    df = pd.DataFrame(data)

    df['date'] = pd.to_datetime(df['date'])
    df['sales'] = pd.to_numeric(df['sales'], errors='coerce').fillna(0)
    df['leads'] = pd.to_numeric(df['leads'], errors='coerce').fillna(0)

    if start and end:
        df = df[(df['date'] >= start) & (df['date'] <= end)]

    daily = df.groupby(df['date'].dt.date)[['sales', 'leads']].sum().reset_index()

    weekly = df.groupby(df['date'].dt.isocalendar().week)[['sales', 'leads']].sum().reset_index()
    weekly.rename(columns={'week': 'week'}, inplace=True)

    monthly = df.groupby(df['date'].dt.month)[['sales', 'leads']].sum().reset_index()
    monthly.rename(columns={'month': 'month'}, inplace=True)

    return {
        "daily": daily.to_dict(orient="records"),
        "weekly": weekly.to_dict(orient="records"),
        "monthly": monthly.to_dict(orient="records"),
        "total_sales": int(df['sales'].sum()),
        "total_leads": int(df['leads'].sum())
    }