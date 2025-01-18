import os
from app.models import db, environment, SCHEMA, Book
from datetime import datetime
from sqlalchemy.sql import text


def seed_books():
  BUCKET_NAME = os.environ.get("S3_BUCKET")
  S3_LOCATION = f"http://{BUCKET_NAME}.s3.us-east-2.amazonaws.com"

  books_data = [
        #English Books
        {
            "id": 1,
            "name": "Charlotte's Web",
            "lang": "English",
            "summary": "In Charlotte's Web, a young girl named Fern saves a runt piglet named Wilbur from being killed, raising him until he is sent to live on a farm owned by Mr. Zuckerman where he befriends a spider named Charlotte; when Wilbur learns he is destined to be slaughtered, Charlotte cleverly spins words in her web praising him as a 'Some Pig,' which convinces Mr. Zuckerman to keep him alive, ultimately saving Wilbur's life through her sacrifice and ingenuity; despite her eventual death, Charlotte's legacy lives on through her children who stay with Wilbur on the farm.",
            "publisher": "Harper & Brothers",
            "publishDate": datetime(1952, 10, 15),
            "author": "E.B. White",
            "genre": ["Novel", "Fiction"],
            "difficulty": "Beginner",
            "imgUrl": f"{S3_LOCATION}/charlotte's_web.jpg",
            "createdAt": datetime.now(),
            "updatedAt": datetime.now()
        },
        {
            "id": 2,
            "name": "The Cat in the Hat",
            "lang": "English",
            "summary": "A mischievous cat arrives on a rainy day to entertain two bored children whose mother is away. Despite their initial apprehension, the children soon find themselves swept up in the Cat's zany antics, which involve balancing a precarious stack of objects and inflating a giant fish with a pump. However, the chaos escalates when the fish explodes, leaving a huge mess. Luckily, the resourceful Cat uses his magic red bowtie to clean everything up before their mother returns, leaving the children with a memorable, albeit slightly messy, experience.",
            "publisher": "Random House",
            "publishDate": datetime(1957, 3, 3),
            "author": "Dr. Seuss",
            "genre": ["Fiction"],
            "difficulty": "Beginner",
            "imgUrl": f"{S3_LOCATION}/the_cat_in_the_hat.jpg",
            "createdAt": datetime.now(),
            "updatedAt": datetime.now()
        },
        {
            "id": 3,
            "name": "Green Eggs and Ham",
            "lang": "English",
            "summary": "A persistent narrator relentlessly pesters a fussy eater to try green eggs and ham, offering them in various locations and scenarios. Despite repeated refusals, the narrator remains undeterred, using increasingly persuasive tactics. The story's repetitive nature and nonsensical elements make it a favorite among young children, while the underlying message of open-mindedness and trying new things resonates with readers of all ages.",
            "publisher": "Random House",
            "publishDate": datetime(1960, 8, 12),
            "author": "Dr. Seuss",
            "genre": ["Fiction"],
            "difficulty": "Beginner",
            "imgUrl": f"{S3_LOCATION}/green_eggs_and_ham.jpg",
            "createdAt": datetime.now(),
            "updatedAt": datetime.now()
        },
        {
            "id": 4,
            "name": "The Very Hungry Caterpillar",
            "lang": "English",
            "summary": "A very hungry caterpillar hatches from an egg on a Sunday and embarks on a week-long eating spree. He devours an increasing amount of food each day, from one apple on Monday to a whole birthday cake on Saturday. Finally, on Sunday, he spins a cocoon and transforms into a beautiful butterfly. This colorful and engaging story teaches children about the days of the week, counting, and the life cycle of a butterfly.",
            "publisher": "HarperCollins",
            "publishDate": datetime(1969, 1, 1),
            "author": "Eric Carle",
            "genre": ["Fiction"],
            "difficulty": "Beginner",
            "imgUrl": f"{S3_LOCATION}/the_very_hungry_caterpillar.jpg",
            "createdAt": datetime.now(),
            "updatedAt": datetime.now()
        },
        {
            "id": 5,
            "name": "To Kill a Mockingbird",
            "lang": "English",
            "summary": "To Kill a Mockingbird tells the story of Scout Finch, a young girl growing up in the fictional Alabama town of Maycomb during the Great Depression, where her lawyer father, Atticus Finch, defends a Black man, Tom Robinson, falsely accused of raping a white woman, despite facing intense community backlash; the novel explores themes of racial injustice, prejudice, and the importance of moral integrity, as Scout and her brother Jem learn valuable lessons about standing up for what is right, even when it is difficult, while also becoming fascinated by their mysterious neighbor, Boo Radley, who eventually emerges to save them from danger.",
            "publisher": "J.B. Lippincott & Co.",
            "publishDate": datetime(1960, 7, 11),
            "author": "Harper Lee",
            "genre": ["Thriller", "Novel", "Fiction"],
            "difficulty": "Intermediate",
            "imgUrl": f"{S3_LOCATION}/to_kill_a_mocking_bird.jpg",
            "createdAt": datetime.now(),
            "updatedAt": datetime.now()
        },
        {
            "id": 6,
            "name": "The Adventures of Sherlock Holmes",
            "lang": "English",
            "summary": "The Adventures of Sherlock Holmes is a collection of twelve short stories by Sir Arthur Conan Doyle, featuring the detective Sherlock Holmes and his chronicler, Dr. John Watson. The stories introduce Holmes and Watson, establishing their method of deduction and their base of operations at 221B Baker Street. They also introduce some of Holmes's most enduring adversaries, including Professor Moriarty. The book's success established Holmes and Watson as literary icons, and the stories continue to be read and adapted to this day.",
            "publisher": "Ward, Lock & Co.",
            "publishDate": datetime(1892, 10, 14),
            "author": "Sir Arthur Conan Doyle",
            "genre": ["Mystery", "Fiction"],
            "difficulty": "Intermediate",
            "imgUrl": f"{S3_LOCATION}/the_adventures_of_sherlock_holmes.jpg",
            "createdAt": datetime.now(),
            "updatedAt": datetime.now()
        },
        {
            "id": 7,
            "name": "Pride and Prejudice",
            "lang": "English",
            "summary": "Pride and Prejudice follows the story of Elizabeth Bennet, the witty and intelligent second daughter of a country gentleman, Mr. Bennet. The novel centers on her relationship with Mr. Darcy, a wealthy and arrogant aristocrat. Through a series of misunderstandings and social events, Elizabeth overcomes her initial prejudice against Mr. Darcy, recognizing his true worth, while Mr. Darcy learns to appreciate Elizabeth's lively spirit and independent nature. The novel is a classic exploration of love, class, and social manners in early 19th-century England.",
            "publisher": "Egerton",
            "publishDate": datetime(1813, 1, 28),
            "author": "Jane Austen",
            "genre": ["Romance", "Novel", "Fiction"],
            "difficulty": "Intermediate",
            "imgUrl": f"{S3_LOCATION}/pride_and_prejudice.jpg",
            "createdAt": datetime.now(),
            "updatedAt": datetime.now()
        },
        {
            "id": 8,
            "name": "1984",
            "lang": "English",
            "summary": "1984 by George Orwell is a dystopian novel set in Oceania, a totalitarian state where the government, led by the enigmatic 'Big Brother,' exercises complete control over every aspect of citizens' lives through constant surveillance and propaganda, forcing them to conform and suppressing any form of independent thought; the story follows Winston Smith, a low-ranking Party member who secretly rebels against the Party by keeping a diary and engaging in a forbidden affair with Julia, but their rebellion is ultimately crushed as they are caught and tortured into submission, leading Winston to betray Julia and fully embrace the Party's ideology, accepting Big Brother as the ultimate authority. ",
            "publisher": "Secker & Warburg",
            "publishDate": datetime(1949, 6, 8),
            "author": "George Orwell",
            "genre": ["Science Fiction", "Fiction"],
            "difficulty": "Conversational",
            "imgUrl": f"{S3_LOCATION}/1984.jpg",
            "createdAt": datetime.now(),
            "updatedAt": datetime.now()
        },
        {
            "id": 9,
            "name": "The Hitchhiker's Guide to the Galaxy",
            "lang": "English",
            "summary": "The Hitchhiker's Guide to the Galaxy is a comic science fiction series created by Douglas Adams. The story follows Arthur Dent, an ordinary Englishman, who escapes Earth's destruction with his friend Ford Prefect, who reveals himself to be an alien researcher for the titular Hitchhiker's Guide to the Galaxy. Together, they embark on a wacky journey through space, encountering a series of bizarre characters and situations. The book is known for its humor, absurdity, and exploration of philosophical themes, making it a favorite among science fiction fans.",
            "publisher": "Pan Books",
            "publishDate": datetime(1979, 10, 12),
            "author": "Douglas Adams",
            "genre": ["Science Fiction", "Comedy", "Fiction"],
            "difficulty": "Conversational",
            "imgUrl": f"{S3_LOCATION}/hitchhikers_guide.jpg",
            "createdAt": datetime.now(),
            "updatedAt": datetime.now()
        },
        {
            "id": 10,
            "name": "The Sound and the Fury",
            "lang": "English",
            "summary": "The Sound and the Fury by William Faulkner is a groundbreaking novel that explores the decline of the Compson family in the fictional Yoknapatawpha County, Mississippi. Told through the perspectives of four different narrators, including the mentally challenged Benjy, the novel is known for its innovative stream-of-consciousness style, fragmented narrative structure, and exploration of themes such as time, memory, and the decay of the Southern aristocracy.",
            "publisher": "Jonathan Cape",
            "publishDate": datetime(1929, 10, 7),
            "author": "William Faulkner",
            "genre": ["Southern Gothic", "Modernist Fiction", "Novel"],
            "difficulty": "Native",
            "imgUrl": f"{S3_LOCATION}/the_sound_and_the_fury.jpg",
            "createdAt": datetime.now(),
            "updatedAt": datetime.now()
        },
        {
            "id": 11,
            "name": "Ulysses",
            "lang": "English",
            "summary": "Ulysses by James Joyce is a modernist novel that follows the experiences of three characters, Leopold Bloom, Stephen Dedalus, and Molly Bloom, over the course of a single day (June 16, 1904) in Dublin, Ireland, drawing parallels between their lives and the characters in Homer's 'Odyssey' - with Bloom representing Odysseus, Molly as Penelope, and Stephen as Telemachus; the book explores themes of identity, consciousness, and the complexities of everyday life through a stream-of-consciousness narrative style, showcasing the rich tapestry of Dublin society and its cultural nuances while using intricate literary devices and allusions to various historical and literary figures.",
            "publisher": "Sylvia Beach",
            "publishDate": datetime(1922, 2, 2),
            "author": "James Joyce",
            "genre": ["Novel", "Fiction"],
            "difficulty": "Native",
            "imgUrl": f"{S3_LOCATION}/ulysses.jpg",
            "createdAt": datetime.now(),
            "updatedAt": datetime.now()
        },

        #Japanese Books
        {
            "id": 12,
            "name": "どんぐりと山猫 (Donguri to Yamaneko)",
            "lang": "Japanese",
            "summary": "The story begins with Ichiro, a curious and imaginative boy, who receives a mysterious postcard in the mail. The sender is Yamaneko (the Wildcat), an enigmatic figure who asks Ichiro to come to a 'court' in the forest. Intrigued, Ichiro follows the instructions on the postcard and ventures deep into the woods. When Ichiro arrives at the appointed place, he discovers a peculiar trial in progress. The participants in the trial are acorns (donguri), which are squabbling over who among them is the most important and deserving of special recognition. Each acorn claims superiority, citing its size, shape, or uniqueness. Their incessant bickering creates a chaotic scene. Presiding over the trial is Yamaneko, who is both whimsical and wise. Yamaneko seeks Ichiro's help in resolving the dispute. However, Ichiro finds himself puzzled by the quarrels of the acorns and struggles to find a solution.",
            "publisher": "Kindaibungeisha",
            "publishDate": datetime(1914, 1, 1),
            "author": "Kenji Miyazawa",
            "genre": ["Fiction", "Drama"],
            "difficulty": "Beginner",
            "imgUrl": f"{S3_LOCATION}/donguri_to_yamaneko.jpg",
            "createdAt": datetime.now(),
            "updatedAt": datetime.now()
        },
        {
            "id": 13,
            "name": "ぐりとぐら (Guri and Gura)",
            "lang": "Japanese",
            "summary": "ぐりとぐらは (Guri and Gura) is a classic children's picture book by Midori Suzuki. It follows the story of two adorable mice siblings, Guri and Gura, who discover a giant turnip growing in their garden. The turnip is so big that they cannot pull it out by themselves. So, they set off on an adventure to find help from their animal friends. They ask a variety of animals, including a duck, a monkey, and a wolf, but none of them are strong enough to pull the turnip alone. Finally, a tiny but clever mouse helps them pull out the giant turnip, and everyone enjoys a delicious feast together. This simple story uses basic vocabulary and repetitive sentence structures, making it ideal for young learners of Japanese.",
            "publisher": "福音館書店 (福音館書店)",
            "publishDate": datetime(1967, 12, 1),
            "author": "鈴木みどり (Midori Suzuki)",
            "genre": ["Fiction"],
            "difficulty": "Beginner",
            "imgUrl": f"{S3_LOCATION}/guri_to_gura.jpg",
            "createdAt": datetime.now(),
            "updatedAt": datetime.now()
        },
        {
            "id": 14,
            "name": "ちびまる子ちゃん (Chibi Maruko Chan)",
            "lang": "Japanese",
            "summary": "ちびまる子ちゃん (Chibi Maruko Chan) is a popular manga series and anime that follows the everyday adventures of a little girl named Momoko Sakura, nicknamed Maruko. The stories are set in the late 1960s and early 1970s Japan and depict Maruko's experiences with her family, friends, and classmates. The series uses simple language and humor to explore themes of childhood, friendship, and family life. Reading Chibi Maruko Chan can be a fun and engaging way for beginners to learn about Japanese culture and everyday expressions.",
            "publisher": "集英社 (Shueisha)",
            "publishDate": datetime(1986, 8, 1),  # First chapter publication date
            "author": "さくらももこ (Momoko Sakura)",
            "genre": ["Slice of Life", "Comedy", "Manga"],
            "difficulty": "Beginner",
            "imgUrl": f"{S3_LOCATION}/chibi_maruko_chan.jpg",
            "createdAt": datetime.now(),
            "updatedAt": datetime.now()
        },
        {
            "id": 15,
            "name": "夢枕獏の陰陽師 (Onmyōji by Baku Yumemakura)",
            "lang": "Japanese",
            "summary": "夢枕獏の陰陽師 (Onmyōji by Baku Yumemakura) is a series of historical fantasy novels set in Heian-era Japan. The series centers around Abe no Seimei, a legendary onmyōji (master of divination and exorcism), and his apprentice, Minamoto no Hiromasa. The novels blend historical fiction with elements of Japanese mythology and folklore, creating a captivating world of spirits, curses, and supernatural battles. The elegant and evocative language, combined with the rich historical and cultural context, makes this series a challenging but rewarding read for intermediate and advanced Japanese learners.",
            "publisher": "角川書店 (Kadokawa Shoten)",
            "publishDate": datetime(1986, 1, 1),
            "author": "夢枕獏 (Baku Yumemakura)",
            "genre": ["Historical Fantasy", "Novel"],
            "difficulty": "Intermediate",
            "imgUrl": f"{S3_LOCATION}/onmyoji.jpg",
            "createdAt": datetime.now(),
            "updatedAt": datetime.now()
        },
        {
            "id": 16,
            "name": "君の名は。 (Your Name.)",
            "lang": "Japanese",
            "summary": "One day, Mitsuha and Taki begin to mysteriously swap bodies while they sleep. When they wake up, they find themselves living each other's lives. At first, they are confused and frustrated by the strange phenomenon, but over time, they adapt by leaving notes and messages for each other to explain what happened during their swapped days. Through this bizarre connection, Mitsuha and Taki begin to develop a strong bond. They come to understand each other's struggles and help each other navigate their respective lives. Taki helps Mitsuha become more confident and assertive, while Mitsuha introduces Taki to a slower, more heartfelt way of living.",
            "publisher": "Kadokawa Shoten",
            "publishDate": datetime(2016, 6, 18),
            "author": "Makoto Shinkai",
            "genre": ["Romance", "Fiction"],
            "difficulty": "Intermediate",
            "imgUrl": f"{S3_LOCATION}/your_name.jpg",
            "createdAt": datetime.now(),
            "updatedAt": datetime.now()
        },
        {
            "id": 17,
            "name": "坂の上の雲 (The Hill of the Cloud)",
            "lang": "Japanese",
            "summary": "坂の上の雲 (The Hill of the Cloud) is a historical novel by Ryōtarō Shiba that chronicles the lives of three close friends from Matsuyama, Ehime Prefecture, during the Meiji era in Japan. The novel follows their journeys as they strive for success in the military, politics, and literature. It depicts the turbulent period of modernization in Japan, including the Russo-Japanese War, with vivid detail and historical accuracy. The novel is known for its epic scope, detailed historical research, and beautiful prose, making it a challenging but rewarding read for intermediate Japanese learners.",
            "publisher": "新潮社 (Shinchosha)",
            "publishDate": datetime(1996, 1, 1),
            "author": "司馬遼太郎 (Ryōtarō Shiba)",
            "genre": ["Fiction", "Novel"],
            "difficulty": "Intermediate",
            "imgUrl": f"{S3_LOCATION}/saka_no_ue_no_kumo.jpg",
            "createdAt": datetime.now(),
            "updatedAt": datetime.now()
        },
        {
            "id": 18,
            "name": "告白 (Confessions)",
            "lang": "Japanese",
            "summary": "告白 (Confessions) is a psychological thriller novel by Kanae Minato. The story is told from the perspective of a female teacher who seeks revenge on the students who bullied her daughter to death. The novel explores themes of bullying, justice, and the dark side of human nature. It is known for its suspenseful plot, shocking twists, and insightful commentary on social issues. Confessions is considered a modern classic in Japanese literature and presents a challenging read for intermediate learners due to its intricate plot and the psychological depth of its characters.",
            "publisher": "双葉社 (Futabasha)",
            "publishDate": datetime(2008, 1, 1),
            "author": "湊かなえ (Kanae Minato)",
            "genre": ["Mystery", "Thriller", "Novel"],
            "difficulty": "Intermediate",
            "imgUrl": f"{S3_LOCATION}/confessions.jpg",
            "createdAt": datetime.now(),
            "updatedAt": datetime.now()
        },
        {
            "id": 19,
            "name": "ノルウェイの森 (Norwegian Wood)",
            "lang": "Japanese",
            "summary": "Norwegian Wood is a poignant coming-of-age novel by Haruki Murakami that explores themes of love, loss, mental illness, and the complexities of human relationships. The story is set in 1960s Japan and is narrated by Toru Watanabe, a man in his thirties looking back on his college days.",
            "publisher": "Kodansha",
            "publishDate": datetime(1987, 9, 4),
            "author": "Haruki Murakami",
            "genre": ["Novel", "Drama", "Fiction"],
            "difficulty": "Conversational",
            "imgUrl": f"{S3_LOCATION}/norwegian_wood.jpg",
            "createdAt": datetime.now(),
            "updatedAt": datetime.now()
        },
        {
            "id": 20,
            "name": "源氏物語 (The Tale of Genji)",
            "lang": "Japanese",
            "summary": "The Tale of Genji revolves around Hikaru Genji, the son of a Japanese emperor and a low-ranking consort, which leaves him politically marginalized despite his beauty, talent, and charm. Stripped of royal rank, Genji becomes a commoner and dedicates his life to the pursuit of art, love, and pleasure. Genji's romantic entanglements are a central focus of the story. He has numerous affairs, often with women of vastly different social standings and temperaments. One of his most complicated relationships is with Fujitsubo, his father's wife, with whom he has a secret child. Another is with Murasaki, a young girl he essentially raises to become his ideal companion.",
            "publisher": "Various publishers",
            "publishDate": datetime(1008, 1, 1),
            "author": "Murasaki Shikibu",
            "genre": ["Novel", "Fiction"],
            "difficulty": "Native",
            "imgUrl": f"{S3_LOCATION}/the_tale_of_genji.jpg",
            "createdAt": datetime.now(),
            "updatedAt": datetime.now()
        },
        {
            "id": 21,
            "name": "人間失格 (No Longer Human)",
            "lang": "Japanese",
            "summary": "人間失格 (No Longer Human) by Osamu Dazai is a semi-autobiographical novel that explores themes of alienation, despair, and the search for meaning in life. Told through the fragmented recollections of the protagonist, Yōzō Ōba, the novel delves into his struggles with social anxiety, alcoholism, and nihilism. Dazai's raw and honest portrayal of human suffering and the complexities of the human condition has made No Longer Human a critically acclaimed and enduringly popular work in Japanese literature. The novel's complex sentence structures, dense symbolism, and exploration of dark themes make it a challenging but rewarding read for native speakers.",
            "publisher": "新潮社 (Shinchosha)",
            "publishDate": datetime(1948, 2, 1),
            "author": "太宰治 (Osamu Dazai)",
            "genre": ["Fiction", "Novel"],
            "difficulty": "Native",
            "imgUrl": f"{S3_LOCATION}/ningen_shikkaku.jpg",
            "createdAt": datetime.now(),
            "updatedAt": datetime.now()
        },

        #Spanish Books
        {
            "id": 22,
            "name": "El Principito (The Little Prince)",
            "lang": "Spanish",
            "summary": "The Little Prince by Antoine de Saint-Exupéry is a poignant and philosophical tale about a pilot stranded in the Sahara Desert who encounters a young prince from a tiny asteroid. Through the Prince's whimsical journey across various planets and encounters with eccentric adults, the story explores themes of love, responsibility, and the importance of childhood wonder. The pilot's friendship with the Prince reminds him of the beauty and fragility of human connection, leaving a lasting impact on his perspective on life.",
            "publisher": "Editorial Sudamericana",
            "publishDate": datetime(1951, 1, 1),
            "author": "Antoine de Saint-Exupéry",
            "genre": ["Fiction"],
            "difficulty": "Beginner",
            "imgUrl": f"{S3_LOCATION}/el_principito.jpg",
            "createdAt": datetime.now(),
            "updatedAt": datetime.now()
        },
        {
            "id": 23,
            "name": "Mi primera visita al zoológico (My First Trip to the Zoo)",
            "lang": "Spanish",
            "summary": "Mi primera visita al zoológico (My First Trip to the Zoo) is an engaging beginner-level Spanish book that introduces children to common animals and their Spanish names. The story follows a young boy, Luis, as he visits the zoo for the first time with his family. Each page features vibrant illustrations of animals like 'el elefante' (the elephant), 'la jirafa' (the giraffe), and 'el león' (the lion), along with simple sentences and pronunciation tips. A perfect book for learning animal names and basic descriptive phrases in Spanish.",
            "publisher": "Pequeños Lectores (Little Readers)",
            "publishDate": datetime(2015, 5, 10),
            "author": "Sofía Ramírez",
            "genre": ["Children's Literature", "Educational"],
            "difficulty": "Beginner",
            "imgUrl": f"{S3_LOCATION}/mi_primera_visita_zoo.jpg",
            "createdAt": datetime.now(),
            "updatedAt": datetime.now()
        },
        {
            "id": 24,
            "name": "Cien años de soledad (One Hundred Years of Solitude)",
            "lang": "Spanish",
            "summary": "One Hundred Years of Solitude, a masterpiece of magical realism, chronicles the tumultuous history of the Buendía family in the mythical Colombian town of Macondo. Through seven generations, the Buendías grapple with love, loneliness, solitude, and the cyclical nature of time. The novel is a richly imaginative and poetic exploration of themes like memory, fate, and the disintegration of the human spirit, interwoven with fantastical elements like rain that falls for four years and a character who can levitate.",
            "publisher": "Editorial Sudamericana",
            "publishDate": datetime(1967, 5, 30),
            "author": "Gabriel García Márquez",
            "genre": ["Fantasy", "Novel", "Fiction"],
            "difficulty": "Intermediate",
            "imgUrl": f"{S3_LOCATION}/cien_anos_de_soledad.jpg",
            "createdAt": datetime.now(),
            "updatedAt": datetime.now()
        },
        {
            "id": 25,
            "name": "Cuentos de la selva (Jungle Tales)",
            "lang": "Spanish",
            "summary": "Cuentos de la selva is a collection of enchanting stories by Horacio Quiroga that take readers into the lush jungles of South America. Through captivating tales of animals, nature, and human interaction, readers learn more advanced Spanish vocabulary and immerse themselves in vivid descriptions and engaging narratives. Perfect for intermediate learners seeking to expand their vocabulary and comprehension skills while enjoying rich storytelling.",
            "publisher": "Ediciones del Sur",
            "publishDate": datetime(2000, 8, 15),
            "author": "Horacio Quiroga",
            "genre": ["Fiction", "Short Stories", "Classic Literature"],
            "difficulty": "Intermediate",
            "imgUrl": f"{S3_LOCATION}/cuentos_de_la_selva.jpg",
            "createdAt": datetime.now(),
            "updatedAt": datetime.now()
        },
        {
            "id": 26,
            "name": "La casa en Mango Street (The House on Mango Street)",
            "lang": "Spanish",
            "summary": "La casa en Mango Street by Sandra Cisneros is a classic coming-of-age story written in beautifully simple yet poetic Spanish. The novel follows the life of Esperanza Cordero, a young Latina girl, as she grows up in a Chicago neighborhood. Each vignette provides insights into her family, dreams, and struggles, making it an excellent choice for intermediate learners looking to improve their reading skills while exploring cultural themes.",
            "publisher": "Vintage Español",
            "publishDate": datetime(1994, 3, 1),
            "author": "Sandra Cisneros",
            "genre": ["Fiction", "Coming-of-Age", "Cultural"],
            "difficulty": "Intermediate",
            "imgUrl": f"{S3_LOCATION}/la_casa_en_mango_street.jpg",
            "createdAt": datetime.now(),
            "updatedAt": datetime.now()
        },
        {
            "id": 27,
            "name": "Crónica de una muerte anunciada (Chronicle of a Death Foretold)",
            "lang": "Spanish",
            "summary": "Crónica de una muerte anunciada by Gabriel García Márquez is a gripping novella that tells the story of a murder in a small Colombian town. Written in García Márquez's signature magical realist style, the book delves into themes of honor, fate, and societal norms. With its intricate storytelling and deeper exploration of cultural nuances, this book challenges conversational-level Spanish speakers to expand their vocabulary and comprehension.",
            "publisher": "Editorial Sudamericana",
            "publishDate": datetime(1981, 1, 1),
            "author": "Gabriel García Márquez",
            "genre": ["Fiction", "Mystery", "Magical Realism"],
            "difficulty": "Conversational",
            "imgUrl": f"{S3_LOCATION}/cronica_de_una_muerte_anunciada.jpg",
            "createdAt": datetime.now(),
            "updatedAt": datetime.now()
        },
        {
            "id": 28,
            "name": "Como agua para chocolate (Like Water for Chocolate)",
            "lang": "Spanish",
            "summary": "Como agua para chocolate by Laura Esquivel is a heartwarming tale set in revolutionary Mexico that combines romance, tradition, and magical realism. Each chapter ties into a traditional Mexican recipe, blending culinary culture with an emotionally charged narrative. This book is perfect for conversational-level Spanish speakers as it introduces idiomatic expressions, regional dialects, and cultural references that enhance both linguistic and cultural understanding.",
            "publisher": "Editorial Planeta",
            "publishDate": datetime(1989, 9, 1),
            "author": "Laura Esquivel",
            "genre": ["Romance", "Magical Realism", "Historical Fiction"],
            "difficulty": "Conversational",
            "imgUrl": f"{S3_LOCATION}/como_agua_para_chocolate.jpg",
            "createdAt": datetime.now(),
            "updatedAt": datetime.now()
        },
        {
            "id": 29,
            "name": "Don Quijote de la Mancha (Don Quixote)",
            "lang": "Spanish",
            "summary": "Don Quixote is a satirical masterpiece of Spanish literature that follows the misadventures of a delusional nobleman who sets out on a quixotic quest to revive the age of chivalry. Driven by the reading of too many romances, Don Quixote, accompanied by his loyal squire Sancho Panza, embarks on a series of comical and tragic encounters, mistaking windmills for giants, inns for castles, and ordinary people for knights and princesses. Cervantes masterfully satirizes the ideals of chivalry, the power of imagination, and the human condition with a blend of humor, pathos, and social commentary.",
            "publisher": "Francisco de Robles",
            "publishDate": datetime(1605, 1, 16),
            "author": "Miguel de Cervantes",
            "genre": ["Novel", "Fiction", "Satire"],
            "difficulty": "Conversational",
            "imgUrl": f"{S3_LOCATION}/don_quijote_de_la_mancha.jpg",
            "createdAt": datetime.now(),
            "updatedAt": datetime.now()
        },
        {
            "id": 30,
            "name": "Rayuela (Hopscotch)",
            "lang": "Spanish",
            "summary": "Rayuela is an experimental novel that defies traditional narrative structures, offering readers multiple ways to experience the story. The novel is divided into two parts: 'Heaven' and 'Hell.' Readers are encouraged to read 'Heaven sequentially, while 'Hell' can be read in a non-linear fashion, allowing for a unique and personalized reading experience. The story follows Horacio Oliveira, an Argentine expatriate in Paris, as he navigates love, loss, and the search for meaning in a fragmented and ever-changing world.",
            "publisher": "Editorial Sudamericana",
            "publishDate": datetime(1963, 1, 1),
            "author": " Julio Cortázar",
            "genre": ["Novel", "Fiction"],
            "difficulty": "Native",
            "imgUrl": f"{S3_LOCATION}/rayuela.jpg",
            "createdAt": datetime.now(),
            "updatedAt": datetime.now()
        }
    ]
  db.session.bulk_insert_mappings(Book, books_data)
  db.session.commit()


def undo_books():
    if environment == "production":
        db.session.execute(f"TRUNCATE TABLE {SCHEMA}.books RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM books"))
    db.session.commit()
