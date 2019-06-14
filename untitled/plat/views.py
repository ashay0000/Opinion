from django.shortcuts import render
from .models import Query
from .models import Gkg
from .forms import query_terms
from django.http import HttpResponse
# Create your views here.
from django.db import models
import json
import re
from sklearn import feature_extraction
from sklearn.feature_extraction.text import TfidfTransformer
from sklearn.feature_extraction.text import CountVectorizer

def index(request):
    Que = Query.objects.all()
    context = {'queries' : Que}
    return render(request,'index.html',context=context)

def save(request):
    obj = json.loads(request.body)
    Query.objects.create(name = obj['EventValue'],start = obj['start_Time'].replace('-',''),region = obj['Region'],end = obj['finish_Time'].replace('-',''),key = obj['EventValue'],theme = obj['Theme'],person = obj['Person'],location = obj['Location'],organization = obj['Organization'])
    return HttpResponse('OK')

def opinion(request):
    Que = Query.objects.all()#用于加载左侧菜单
    id=request.GET.get('c','')
    q = Query.objects.get(id=id)#根据当前事件查询到的检索条件
    r = Gkg.objects.filter(title__icontains=q.key)#根据检索条件查询到的查询结果#查询语句还需要修改


    for i in r:
        i.abstract = i.content[len(i.title):]+'...'

    content = []
    for i in r:
        t = i.content.lower()
        t = re.sub("\"|,|\.", "", t)
        content.append(t)

    vectorizer = CountVectorizer()  # 该类会将文本中的词语转换为词频矩阵，矩阵元素a[i][j] 表示j词在i类文本下的词频
    transformer = TfidfTransformer()  # 该类会统计每个词语的tf-idf权值
    tfidf = transformer.fit_transform(
        vectorizer.fit_transform(content))  # 第一个fit_transform是计算tf-idf，第二个fit_transform是将文本转为词频矩阵
    word = vectorizer.get_feature_names()  # 获取词袋模型中的所有词语
    weight = tfidf.toarray()  # 将tf-idf矩阵抽取出来，元素a[i][j]表示j词在i类文本中的tf-idf权重
    l = []
    for i in range(len(weight)):  # 打印每类文本的tf-idf词语权重，第一个for遍历所有文本，第二个for便利某一类文本下的词语权重
        d = {}
        for j in range(len(word)):
            d[word[j]]=weight[i][j]
        l.append(sorted(d, key=d.__getitem__, reverse=True)[:3])

    f = 0
    for i in r:
        i.kw = l[f]
        f = f+1


    context = {'queries' : Que,
               'c':id,
               'news':r}
    return render(request,'Opinion monitoring.html',context=context)

def trend(request):
    Que = Query.objects.all()#用于加载左侧菜单
    id = request.GET.get('c', '')
    q = Query.objects.get(id=id)  # 根据当前事件查询到的检索条件
    r = Gkg.objects.filter(title__icontains=q.key)  # 根据检索条件查询到的查询结果#查询语句还需要修改
    context = {'queries': Que,
               'c': id,
               'data':[2,1,4,3,5,7,6]
              }
    return render(request, 'Trend analysis.html', context=context)


def media(request):
    Que = Query.objects.all()  # 用于加载左侧菜单
    id = request.GET.get('c', '')
    q = Query.objects.get(id=id)  # 根据当前事件查询到的检索条件
    r = Gkg.objects.filter(title__icontains=q.key)  # 根据检索条件查询到的查询结果#查询语句还需要修改
    result = r.values("ipbelong").annotate(c=models.Count("ipbelong"))
    print(result)
    data = []
    for i in result:
        d = {'value':i['c'],'name':i['ipbelong']}#聚合查询结果和查询结果似乎结构有所差异
        data.append(d)
    context = {'queries': Que,
               'c': id,
               'data':json.dumps(data)
               }
    return render(request, 'Media distribution.html', context=context)
def nation(request):
    Que = Query.objects.all()  # 用于加载左侧菜单
    id = request.GET.get('c', '')
    q = Query.objects.get(id=id)  # 根据当前事件查询到的检索条件
    r = Gkg.objects.filter(title__icontains=q.key)  # 根据检索条件查询到的查询结果#查询语句还需要修改
    context = {'queries': Que,
               'c': id,
               }
    return render(request, 'National emotion.html', context=context)
def event(request):
    Que = Query.objects.all()  # 用于加载左侧菜单
    id = request.GET.get('c', '')
    q = Query.objects.get(id=id)  # 根据当前事件查询到的检索条件
    r = Gkg.objects.filter(title__icontains=q.key)  # 根据检索条件查询到的查询结果#查询语句还需要修改
    context = {'queries': Que,
               'c': id,
               }
    return render(request, 'Event distribution.html', context=context)
def word(request):
    Que = Query.objects.all()  # 用于加载左侧菜单
    id = request.GET.get('c', '')
    q = Query.objects.get(id=id)  # 根据当前事件查询到的检索条件
    r = Gkg.objects.filter(title__icontains=q.key)  # 根据检索条件查询到的查询结果#查询语句还需要修改

    #清理无用字符
    illegal_char = ['#','%','|','_','@','\'']
    content = []
    for i in r:
        content.append(i.content)
    #tmp_list = []
    data = ' '.join(content)


    def count_word(all_the_text):
        result = {}
        all_the_text = all_the_text.lower()
        all_the_text = re.sub("\"|,|\.", "", all_the_text)

        for word in all_the_text.split():
            if word not in result:
                result[word] = 0
            result[word] += 1
        return result

    count = count_word(data)
    value = []
    for k, v in count.items():
        d = {'name':k,'value':v}
        value.append(d)
    print(json.dumps(value))
    context = {'queries': Que,
               'c': id,
               'value':json.dumps(value)
               }
    return render(request, 'Word cloud.html', context=context)

def theme(request):
    Que = Query.objects.all()  # 用于加载左侧菜单
    id = request.GET.get('c', '')
    q = Query.objects.get(id=id)  # 根据当前事件查询到的检索条件
    r = Gkg.objects.filter(title__icontains=q.key)  # 根据检索条件查询到的查询结果#查询语句还需要修改
    context = {'queries': Que,
               'c': id,
               }
    return render(request, 'Word cloud.html', context=context)