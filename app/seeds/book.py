import os
from app.models import db, environment, SCHEMA, Book
from datetime import datetime

def seed_books():
  BUCKET_NAME = os.environ.get("S3_BUCKET")
  S3_LOCATION = f"http://{BUCKET_NAME}.s3.amazonaws.com/"

  books_data = [
    #English Books
    {
        "id": 1,
        "name": "Charlotte's Web",
        "lang": "English",
        "summary": "A heartwarming story about friendship between a pig named Wilbur and a spider named Charlotte.",
        "publisher": "Harper & Brothers",
        "publishDate": datetime(1952, 10, 15),
        "author": "E.B. White",
        "genre": ["Novel", "Fiction"],
        "avgRating": 4.2,
        "difficulty": "Beginner",
        "imgUrl": None,
        "createdAt": datetime.now(),
        "updatedAt": datetime.now()
    },
    {
        "id": 2,
        "name": "To Kill a Mockingbird",
        "lang": "English",
        "summary": "A gripping tale of racial injustice and moral growth in the American South.",
        "publisher": "J.B. Lippincott & Co.",
        "publishDate": datetime(1960, 7, 11),
        "author": "Harper Lee",
        "genre": ["Thriller", "Novel", "Fiction"],
        "avgRating": 4.3,
        "difficulty": "Intermediate",
        "imgUrl": None,
        "createdAt": datetime.now(),
        "updatedAt": datetime.now()
    },
    {
        "id": 3,
        "name": "1984",
        "lang": "English",
        "summary": "A dystopian novel about surveillance and authoritarianism.",
        "publisher": "Secker & Warburg",
        "publishDate": datetime(1949, 6, 8),
        "author": "George Orwell",
        "genre": ["Science Fiction", "Fiction"],
        "avgRating": 4.2,
        "difficulty": "Conversational",
        "imgUrl": None,
        "createdAt": datetime.now(),
        "updatedAt": datetime.now()
    },
    {
        "id": 4,
        "name": "Ulysses",
        "lang": "English",
        "summary": "An intricate exploration of the lives of Dubliners in a single day.",
        "publisher": "Sylvia Beach",
        "publishDate": datetime(1922, 2, 2),
        "author": "James Joyce",
        "genre": ["Novel", "Fiction"],
        "avgRating": 3.7,
        "difficulty": "Native",
        "imgUrl": None,
        "createdAt": datetime.now(),
        "updatedAt": datetime.now()
    },

    #Japanese Books
    {
        "id": 5,
        "name": "どんぐりと山猫 (Donguri to Yamaneko)",
        "lang": "Japanese",
        "summary": "A delightful tale of a boy solving a forest mystery.",
        "publisher": "Kindaibungeisha",
        "publishDate": datetime(1914, 1, 1),
        "author": "Kenji Miyazawa",
        "genre": ["Fiction", "Drama"],
        "avgRating": 4.1,
        "difficulty": "Beginner",
        "imgUrl": None,
        "createdAt": datetime.now(),
        "updatedAt": datetime.now()
    },
    {
        "id": 6,
        "name": "君の名は。 (Your Name.)",
        "lang": "Japanese",
        "summary": "A love story transcending time and space.",
        "publisher": "Kadokawa Shoten",
        "publishDate": datetime(2016, 6, 18),
        "author": "Makoto Shinkai",
        "genre": ["Romance", "Fiction"],
        "avgRating": 4.4,
        "difficulty": "Intermediate",
        "imgUrl": None,
        "createdAt": datetime.now(),
        "updatedAt": datetime.now()
    },
    {
        "id": 7,
        "name": "ノルウェイの森 (Norwegian Wood)",
        "lang": "Japanese",
        "summary": "A coming-of-age story exploring love and loss.",
        "publisher": "Kodansha",
        "publishDate": datetime(1987, 9, 4),
        "author": "Haruki Murakami",
        "genre": ["Novel", "Drama", "Fiction"],
        "avgRating": 4.1,
        "difficulty": "Conversational",
        "imgUrl": None,
        "createdAt": datetime.now(),
        "updatedAt": datetime.now()
    },
    {
        "id": 8,
        "name": "源氏物語 (The Tale of Genji)",
        "lang": "Japanese",
        "summary": "A classical Japanese epic exploring court life, love, and politics.",
        "publisher": "Various publishers",
        "publishDate": datetime(1008, 1, 1),
        "author": "Murasaki Shikibu",
        "genre": ["Novel", "Fiction"],
        "avgRating": 4.2,
        "difficulty": "Native",
        "imgUrl": None,
        "createdAt": datetime.now(),
        "updatedAt": datetime.now()
    },

    #Spanish Books
    {
        "id": 9,
        "name": "El Principito (The Little Prince)",
        "lang": "Spanish",
        "summary": "A poetic tale of a young prince exploring different planets.",
        "publisher": "Editorial Sudamericana",
        "publishDate": datetime(1951, 1, 1),
        "author": "Antoine de Saint-Exupéry",
        "genre": ["Fiction"],
        "avgRating": 4.6,
        "difficulty": "Beginner",
        "imgUrl": None,
        "createdAt": datetime.now(),
        "updatedAt": datetime.now()
    },
    {
        "id": 10,
        "name": "Cien años de soledad (One Hundred Years of Solitude)",
        "lang": "Spanish",
        "summary": "The story of the Buendía family across generations, exploring love, power, and destiny.",
        "publisher": "Editorial Sudamericana",
        "publishDate": datetime(1967, 5, 30),
        "author": "Gabriel García Márquez",
        "genre": ["Fantasy", "Novel", "Fiction"],
        "avgRating": 4.6,
        "difficulty": "Intermediate",
        "imgUrl": None,
        "createdAt": datetime.now(),
        "updatedAt": datetime.now()
    },
    {
        "id": 11,
        "name": "Don Quijote de la Mancha (Don Quixote)",
        "lang": "Spanish",
        "summary": "A satire of chivalric traditions through the adventures of a self-proclaimed knight and his loyal squire.",
        "publisher": "Francisco de Robles",
        "publishDate": datetime(1605, 1, 16),
        "author": "Miguel de Cervantes",
        "genre": ["Novel", "Fiction", "Satire"],
        "avgRating": 4.1,
        "difficulty": "Conversational",
        "imgUrl": None,
        "createdAt": datetime.now(),
        "updatedAt": datetime.now()
    },
    {
        "id": 12,
        "name": "Rayuela (Hopscotch)",
        "lang": "Spanish",
        "summary": "A groundbreaking novel challenging traditional narrative structures.",
        "publisher": "Editorial Sudamericana",
        "publishDate": datetime(1963),
        "author": " Julio Cortázar",
        "genre": ["Novel", "Fiction"],
        "avgRating":  4.3,
        "difficulty": "Native",
        "imgUrl": None,
        "createdAt": datetime.now(),
        "updatedAt": datetime.now()
    }

]
  db.session.bulk_insert_mappings(Book, books)
  db.session.commit()
