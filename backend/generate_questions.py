import sys
import os

from app.database.questions_data import QUESTIONS_DATA

def main():
    if len(QUESTIONS_DATA) > 75: 
        print("Already updated.")
        return

    new_questions = []
    current_id = len(QUESTIONS_DATA) + 1

    # Keep track of what we've seen to ensure we process each stream/skill exactly once
    seen = set()

    for q in QUESTIONS_DATA:
        key = (q['stream'], q['skill'])
        if key not in seen:
            seen.add(key)
            stream, skill = key
            q1 = {
                "id": current_id,
                "stream": stream,
                "skill": skill,
                "question": f"Which of the following describes an advanced scenario in {skill.replace('_', ' ').title()}?",
                "options": ["Application of advanced methods", "Ignoring best practices", "Routine basic task", "None of the above"],
                "answer": "Application of advanced methods"
            }
            q2 = {
                "id": current_id + 1,
                "stream": stream,
                "skill": skill,
                "question": f"When solving complex problems related to {skill.replace('_', ' ').title()}, what is most essential?",
                "options": ["Guesswork", "Critical thinking", "Speed over accuracy", "Ignoring the problem"],
                "answer": "Critical thinking"
            }
            new_questions.extend([q1, q2])
            current_id += 2

    all_data = QUESTIONS_DATA + new_questions

    with open("app/database/questions_data.py", "w", encoding="utf-8") as f:
        f.write("QUESTIONS_DATA = [\n")
        for q in all_data:
            f.write("    {\n")
            f.write(f'        "id": {q["id"]},\n')
            f.write(f'        "stream": "{q["stream"]}",\n')
            f.write(f'        "skill": "{q["skill"]}",\n')
            f.write(f'        "question": "{q["question"]}",\n')
            ops_str = ', '.join([f'"{opt}"' for opt in q["options"]])
            f.write(f'        "options": [{ops_str}],\n')
            f.write(f'        "answer": "{q["answer"]}"\n')
            f.write("    },\n")
        f.write("]\n")
    print(f"Added {len(new_questions)} questions.")

if __name__ == "__main__":
    main()
