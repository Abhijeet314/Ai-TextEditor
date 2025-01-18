from flask import Flask, request, jsonify
from flask_cors import CORS
from langchain_groq import ChatGroq
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
import os

app = Flask(__name__)
CORS(app)

# Initialize the ChatGroq LLM with API Key and Model
llm = ChatGroq(groq_api_key=os.getenv("GROQ_API_KEY"), model="Gemma2-9b-It")

# Define the Prompt Template
prompt_template = """
You are a helpful assistant. You will be provided with two inputs by the user:
- document: {document_data}
- language: {Language}

Your task is to summarize the document and then translate it into the provided language.
"""

chat_template = """
You are a helpful assistant You will be provided with the document: {document_data}
and you have to answer questions based on that document the questions will be provided by the user : {input}
"""

# Create the Prompt
prompt = PromptTemplate(template=prompt_template, input_variables=["document_data", "Language"])

chat = PromptTemplate(template=chat_template, input_variables=['document_data', "input"])

@app.route('/translateDocument', methods=['POST'])
def translate_document():
    try:
        # Parse JSON data from the request
        data = request.json

        if not data:
            return jsonify({"error": "No data provided"}), 400

        # Extract input fields
        document = data.get("document_data")
        language = data.get("Language")

        if not document or not language:
            return jsonify({"error": "Missing 'document_data' or 'Language' in the request"}), 400

        # Generate the prompt
        chain = LLMChain(llm=llm, prompt=prompt)
        response = chain.run(document_data=document, Language=language)

        # Return the response as JSON
        return jsonify({"response": response})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/chatToDocument', methods=['POST'])
def chatToDocument():
    try:
        data = request.json

        document = data.get("document_data")
        question = data.get("input")

        chain = LLMChain(llm=llm, prompt=chat)
        response = chain.run(document_data = document, input=question)

        return jsonify({"response" : response})
    except Exception as e:
        return jsonify({"error" : str(e)}), 500


if __name__ == '__main__':
    # Run Flask app
    app.run(host='0.0.0.0', port=5000, debug=True)
