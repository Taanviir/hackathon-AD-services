#!/bin/bash

json_payload=$(cat <<EOF
{
    "requestTitle": "New state of the art school",
    "requestDescription": "This is a plan to build a new state of the art coding school in Abu Dhabi Mina Zayed. The idea is to have students from all over the world come and study here for free and achieve industry-ready skills for software development. Attached along is an image of a concept of the school.",
    "priorityLevel": "",
    "dueDate": "2024-11-24"
}
EOF
)

# Specify the file to upload
file_path="path/to/your/file.jpg"

# Make the curl request
curl -X POST http://localhost:8000/api/opinion_request/ \
    -H "Content-Type: multipart/form-data" \
    -F "data=${json_payload}" \
    -F "file=@${file_path}"
