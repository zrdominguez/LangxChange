import os

def seed_books():
  BUCKET_NAME = os.environ.get("S3_BUCKET")
  S3_LOCATION = f"http://{BUCKET_NAME}.s3.amazonaws.com/"

  from datetime import datetime

def seed_books():
  books = [
    # English Books
    {
      "name": "Basic English Grammar",
      "lang": "English",
      "summary": "A beginner's guide to English grammar fundamentals.",
      "publisher": "Grammar House",
      "author": "Betty Azar",
      "genre": "Education",
      "avgRating": 4.5,
      "imgUrl": "https://example.com/basic-english-grammar.jpg",
      "difficulty": "Beginner",
      "createdAt": datetime.now(),
      "updatedAt": datetime.now()
    },
    {
      "name": "Intermediate English Conversations",
      "lang": "English",
      "summary": "Learn to engage in everyday conversations fluently.",
      "publisher": "Converse Publications",
      "author": "John Doe",
      "genre": "Language Learning",
      "avgRating": 4.2,
      "imgUrl": "https://example.com/intermediate-conversations.jpg",
      "difficulty": "Intermediate",
      "createdAt": datetime.now(),
      "updatedAt": datetime.now()
    },
    {
      "name": "Mastering English Idioms",
      "lang": "English",
      "summary": "A comprehensive guide to common English idioms.",
      "publisher": "Lingo Mastery",
      "author": "Jane Smith",
      "genre": "Language Learning",
      "avgRating": 4.7,
      "imgUrl": "https://example.com/mastering-idioms.jpg",
      "difficulty": "Conversational",
      "createdAt": datetime.now(),
      "updatedAt": datetime.now()
    },
    {
      "name": "The Great Gatsby",
      "lang": "English",
      "summary": "A classic novel about the American dream.",
      "publisher": "Scribner",
      "author": "F. Scott Fitzgerald",
      "genre": "Fiction",
      "avgRating": 4.8,
      "imgUrl": "https://example.com/great-gatsby.jpg",
      "difficulty": "Native",
      "createdAt": datetime.now(),
      "updatedAt": datetime.now()
    },
    {
      "name": "Shakespeare's Sonnets",
      "lang": "English",
      "summary": "A collection of poetry by William Shakespeare.",
      "publisher": "Penguin Classics",
      "author": "William Shakespeare",
      "genre": "Poetry",
      "avgRating": 4.9,
      "imgUrl": "https://example.com/shakespeares-sonnets.jpg",
      "difficulty": "Native",
      "createdAt": datetime.now(),
      "updatedAt": datetime.now()
    },
    # Spanish Books
    {
      "name": "Español Básico",
      "lang": "Spanish",
      "summary": "Una guía básica para aprender español desde cero.",
      "publisher": "Lengua Viva",
      "author": "Maria Gonzalez",
      "genre": "Educación",
      "avgRating": 4.4,
      "imgUrl": "https://example.com/espanol-basico.jpg",
      "difficulty": "Beginner",
      "createdAt": datetime.now(),
      "updatedAt": datetime.now()
    },
    {
      "name": "Conversaciones Cotidianas",
      "lang": "Spanish",
      "summary": "Frases y conversaciones comunes para el día a día.",
      "publisher": "Habla Español",
      "author": "Carlos Ruiz",
      "genre": "Lenguaje",
      "avgRating": 4.3,
      "imgUrl": "https://example.com/conversaciones-cotidianas.jpg",
      "difficulty": "Intermediate",
      "createdAt": datetime.now(),
      "updatedAt": datetime.now()
    },
    {
      "name": "Cuentos para Hablar",
      "lang": "Spanish",
      "summary": "Relatos breves para mejorar la fluidez en español.",
      "publisher": "Narrativa Viva",
      "author": "Lucia Pérez",
      "genre": "Narrativa",
      "avgRating": 4.6,
      "imgUrl": "https://example.com/cuentos-hablar.jpg",
      "difficulty": "Conversational",
      "createdAt": datetime.now(),
      "updatedAt": datetime.now()
    },
    {
      "name": "Don Quijote de la Mancha",
      "lang": "Spanish",
      "summary": "Una novela clásica de la literatura española.",
      "publisher": "Real Academia Española",
      "author": "Miguel de Cervantes",
      "genre": "Ficción",
      "avgRating": 4.9,
      "imgUrl": "https://example.com/don-quijote.jpg",
      "difficulty": "Native",
      "createdAt": datetime.now(),
      "updatedAt": datetime.now()
    },
    {
      "name": "Poemas de Neruda",
      "lang": "Spanish",
      "summary": "Una colección de poesías del gran poeta Pablo Neruda.",
      "publisher": "Editorial Los Andes",
      "author": "Pablo Neruda",
      "genre": "Poesía",
      "avgRating": 4.8,
      "imgUrl": "https://example.com/poemas-neruda.jpg",
      "difficulty": "Native",
      "createdAt": datetime.now(),
      "updatedAt": datetime.now()
    },
    # Japanese Books
    {
      "name": "こんにちは 日本語",
      "lang": "Japanese",
      "summary": "初学者のための日本語学習ガイド。",
      "publisher": "Nihongo Center",
      "author": "Tanaka Keiko",
      "genre": "Education",
      "avgRating": 4.5,
      "imgUrl": "https://example.com/konnichiwa-nihongo.jpg",
      "difficulty": "Beginner",
      "createdAt": datetime.now(),
      "updatedAt": datetime.now()
    },
    {
      "name": "会話の学習",
      "lang": "Japanese",
      "summary": "日常的な会話の習慣のためのガイド。",
      "publisher": "Tokyo Press",
      "author": "Yamamoto Hiroshi",
      "genre": "Language Learning",
      "avgRating": 4.3,
      "imgUrl": "https://example.com/kaiwa-gakushuu.jpg",
      "difficulty": "Intermediate",
      "createdAt": datetime.now(),
      "updatedAt": datetime.now()
    },
    {
      "name": "おしゃべり文化",
      "lang": "Japanese",
      "summary": "日本語の流暢さを高めるための文化的エッセイ。",
      "publisher": "Cultural Press",
      "author": "Kobayashi Aiko",
      "genre": "Culture",
      "avgRating": 4.7,
      "imgUrl": "https://example.com/oshaberi-bunka.jpg",
      "difficulty": "Conversational",
      "createdAt": datetime.now(),
      "updatedAt": datetime.now()
    },
    {
      "name": "吾輩は猫である",
      "lang": "Japanese",
      "summary": "夏目漱石による日本文学の傑作。猫の視点から人間社会を描く。",
      "publisher": "岩波書店",
      "author": "夏目漱石",
      "genre": "文学",
      "avgRating": 4.8,
      "imgUrl": "https://example.com/wagahai-wa-neko.jpg",
      "difficulty": "Native",
      "createdAt": datetime.now(),
      "updatedAt": datetime.now()
    },
    {
      "name": "雪国",
      "lang": "Japanese",
      "summary": "川端康成の代表作。雪深い地方での人間模様を描く感動の物語。",
      "publisher": "新潮社",
      "author": "川端康成",
      "genre": "文学",
      "avgRating": 4.9,
      "imgUrl": "https://example.com/yukiguni.jpg",
      "difficulty": "Native",
      "createdAt": datetime.now(),
      "updatedAt": datetime.now()
    }
  ]
  db.session.bulk_insert_mappings(Product, products_data)
  db.session.commit()
