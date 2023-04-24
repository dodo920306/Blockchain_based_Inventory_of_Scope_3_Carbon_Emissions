from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import NoteSerializer
from base.models import Note

import subprocess
import json
import os
from dotenv import load_dotenv, dotenv_values

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username # encrypted
        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token',
        '/api/token/refresh',
        '/api/query',
        '/api/tx',
        '/api/blocks'
    ]
    return Response(routes)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getNotes(request):
    user = request.user
    notes = user.note_set.all()
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def index(request):
    cmd = "/home/ubuntu/website/backend/base/api/token_erc_20/token_erc_20 " + request.GET.get('cmd')
    un = request.user.username
    match un:
        case "org1minter":
            env = dotenv_values("/home/ubuntu/website/backend/base/api/env/.env.org1.minter")
        case "org1admin":
            env = dotenv_values("/home/ubuntu/website/backend/base/api/env/.env.org1.admin")
        case "org1spender":
            env = dotenv_values("/home/ubuntu/website/backend/base/api/env/.env.org1.spender")
        case "org1user1":
            env = dotenv_values("/home/ubuntu/website/backend/base/api/env/.env.org1.user1")
        case "org2admin":
            env = dotenv_values("/home/ubuntu/website/backend/base/api/env/.env.org2.admin")
        case "org2recipient":
            env = dotenv_values("/home/ubuntu/website/backend/base/api/env/.env.org2.recipient")
        case "org2user1":
            env = dotenv_values("/home/ubuntu/website/backend/base/api/env/.env.org2.user1")
        case "org3admin":
            env = dotenv_values("/home/ubuntu/website/backend/base/api/env/.env.org3.admin")
        case "org3user1":
            env = dotenv_values("/home/ubuntu/website/backend/base/api/env/.env.org3.user1")
        case _:
            env = dotenv_values("/home/ubuntu/website/backend/base/api/env/.env.org1.minter")
    res = subprocess.run(cmd.split(" "), env=env, capture_output=True)
    output = res.stdout.decode().split("***")
    transaction, result = output[0].strip("-> ").rsplit(".", 1)[0], ""
    action = ""
    if (res.stderr.decode() != ""):
        result = "Failed."
    if (len(output) > 1):
        result = output[1].strip().replace("Result: ", "")
    if (len(transaction.split(" ")) > 2):
        action = transaction.split(" ")[0].strip()
        transaction = transaction.split(" ")[2]
    return JsonResponse({"user": un, "action": action, "transaction": transaction, "result": result, 'error_msg': res.stderr.decode()})

@api_view(['GET'])
def getTx(request):
    
    un = request.user.username
    match un:
        case "org1minter":
            env = dotenv_values("/home/ubuntu/website/backend/base/api/env/.env.org1.minter")
        case "org1admin":
            env = dotenv_values("/home/ubuntu/website/backend/base/api/env/.env.org1.admin")
        case "org1spender":
            env = dotenv_values("/home/ubuntu/website/backend/base/api/env/.env.org1.spender")
        case "org1user1":
            env = dotenv_values("/home/ubuntu/website/backend/base/api/env/.env.org1.user1")
        case "org2admin":
            env = dotenv_values("/home/ubuntu/website/backend/base/api/env/.env.org2.admin")
        case "org2recipient":
            env = dotenv_values("/home/ubuntu/website/backend/base/api/env/.env.org2.recipient")
        case "org2user1":
            env = dotenv_values("/home/ubuntu/website/backend/base/api/env/.env.org2.user1")
        case "org3admin":
            env = dotenv_values("/home/ubuntu/website/backend/base/api/env/.env.org3.admin")
        case "org3user1":
            env = dotenv_values("/home/ubuntu/website/backend/base/api/env/.env.org3.user1")
        case _:
            env = dotenv_values("/home/ubuntu/website/backend/base/api/env/.env.org1.minter")
    cmd = "/home/ubuntu/website/backend/base/api/fetch_blocks/fetch_blocks.sh"
    res = subprocess.run(cmd.split(" "), env=env, capture_output=True)
    cmd = "/home/ubuntu/website/backend/base/api/fetch_transactions/fetch_transactions"
    res = subprocess.run(cmd.split(" "), env=env, capture_output=True)
    resFormatString = res.stdout.decode().split("\n")[:-1]

        resFormatString[i] = json.loads(resFormatString[i])
        resFormatString[i]['Payload'] = json.loads(resFormatString[i]['Payload'])
    return JsonResponse({"output": resFormatString})

@api_view(['GET'])
def getBlocks(request):
    cmd = "/home/ubuntu/website/backend/base/api/fetch_blocks/fetch_blocks.sh"
    un = request.user.username
    match un:
        case "org1minter":
            env = dotenv_values("/home/ubuntu/website/backend/base/api/env/.env.org1.minter")
        case "org1admin":
            env = dotenv_values("/home/ubuntu/website/backend/base/api/env/.env.org1.admin")
        case "org1spender":
            env = dotenv_values("/home/ubuntu/website/backend/base/api/env/.env.org1.spender")
        case "org1user1":
            env = dotenv_values("/home/ubuntu/website/backend/base/api/env/.env.org1.user1")
        case "org2admin":
            env = dotenv_values("/home/ubuntu/website/backend/base/api/env/.env.org2.admin")
        case "org2recipient":
            env = dotenv_values("/home/ubuntu/website/backend/base/api/env/.env.org2.recipient")
        case "org2user1":
            env = dotenv_values("/home/ubuntu/website/backend/base/api/env/.env.org2.user1")
        case "org3admin":
            env = dotenv_values("/home/ubuntu/website/backend/base/api/env/.env.org3.admin")
        case "org3user1":
            env = dotenv_values("/home/ubuntu/website/backend/base/api/env/.env.org3.user1")
        case _:
            env = dotenv_values("/home/ubuntu/website/backend/base/api/env/.env.org1.minter")
    res = subprocess.run(cmd.split(" "), env=env, capture_output=True)
    # 指定文件夹路径
    folder_path = "/home/ubuntu/website/backend/base/api/fetch_blocks/"

    # 读取文件夹中所有带有 "mychannel_" 前缀的 JSON 文件
    json_files = [os.path.join(folder_path, f) for f in os.listdir(folder_path) if f.startswith("mychannel_") and f.endswith(".json")]
    json_files.sort(key=lambda x: int(x.split("_")[2].split(".")[0]))

    # 读取 JSON 文件内容并将其存入数组
    json_array = {}
    i = 0
    for file_path in json_files:
        with open(file_path, "r") as f:
            json_data = json.load(f)
            json_array[i] = json_data
            i = i + 1
    # json_array['output'] = res.stderr.decode()
    return JsonResponse(json_array)
