import google.generativeai as genai
from flask import Flask, request
import json

google_api_key = open("google_api_key.txt", 'r').read()
genai.configure(api_key=google_api_key)

model = genai.GenerativeModel('gemini-pro')

def primary_info(prompt):
    out_ = model.generate_content('''create a content for 10 slides in JSON format such that first key is the intro 
    title of the ppt and second key is subtitle text for title and further each slide is a key and each key is numbered 
    like slide1, slide2 and for each slide we would have one value and this value would be a dict whose first key would 
    be a heading and second key would be detailed content whose value would be an array with 5 elements corresponding to 
    its 30 worded detailed content . the source is ''' + prompt + ''' information across the web. Make sure we have a 
    content for 10 slides''')

    return out_.text

def standardise(out_):
    out_new = model.generate_content(''' 'INPUT' : Convert the following content into dict format. the specified format is:
                                                    {
                                                        "Intro Title":"{should only contain alphabets}",
                                                        "Intro Subtitle":"{should be only 5 words}",
                                                        "Slide1":{
                                                            "Heading":"",
                                                            "Content":["","",...]{should have five elements}
                                                        },
                                                        "Slide2":{
                                                            "Heading":"",
                                                            "Content":["","",....]{should have five elements}
                                                        },.....
                                                    }
                                                    The source is'''+ out_+'''Remember that the content should be in the 
                                                    specified dict format only and starts with '{' and ends with '}' and make sure 
                                                    no key is null valued.
                                        'JSON':            
                                    ''')
    

    left_index = out_new.text.find("{")
    right_index = out_new.text.rfind("}")

    if left_index != -1 and right_index != -1:
        result = out_new.text[left_index: right_index+1]
    else:
        result = out_new.text

    return result

def jsonifocation(result):
    result = json.loads(result)
    result_arr = result.copy()
    result_arr['arr_slides'] = []

    for i in list(result_arr.keys())[2:-1]:
        dict_ = {}
        dict_['id'] = i
        dict_['Heading'] = result_arr[i]['Heading']
        dict_['Content'] = result_arr[i]['Content']
        
        result_arr['arr_slides'].append(dict_)
        result_arr.pop(i)

    return result_arr

def file_gen(result_arr):
    file_path = "C:/Desktop/PROJECTS/prastuti-ai/src/app/data/data.json"

    with open(file_path, 'w') as json_file:
        json.dump(result_arr, json_file)



def pipeline_run(prompt):
    out_ = primary_info(prompt)
    result = standardise(out_)
    result_arr = jsonifocation(result)
    print(result_arr)
    file_gen(result_arr)


# pipeline_run('AI')

app = Flask(__name__)

@app.route("/")
def hi():
    return "Hello World"

@app.route('/create-ppt', methods=['POST'])
def process_string_input():
    print('a')
    request_data = request.get_json()
    prompt = request_data['prompt']
    pipeline_run(prompt)

    return f'Your Prompt{prompt}'

if __name__ == '__main__':
    app.run(debug=True)



