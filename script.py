import spotipy
from spotipy.oauth2 import SpotifyOAuth
import os

# Spotify API credentials
SPOTIPY_CLIENT_ID = 'your_client_id'
SPOTIPY_CLIENT_SECRET = 'your_client_secret'
SPOTIPY_REDIRECT_URI = 'http://localhost:8888/callback'
SCOPE = 'user-top-read'

def get_top_artist():
    sp = spotipy.Spotify(auth_manager=SpotifyOAuth(
        client_id=SPOTIPY_CLIENT_ID,
        client_secret=SPOTIPY_CLIENT_SECRET,
        redirect_uri=SPOTIPY_REDIRECT_URI,
        scope=SCOPE
    ))

    results = sp.current_user_top_artists(limit=1, time_range='medium_term')
    if results['items']:
        top_artist = results['items'][0]['name']
        return top_artist
    else:
        return "No top artist found"

if __name__ == "__main__":
    print(get_top_artist())
