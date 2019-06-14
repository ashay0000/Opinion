from django import forms
class query_terms(forms.Form):
    Region = forms.CharField()
    Theme = forms.CharField()
    Organization = forms.CharField()
    Person = forms.CharField()
    start_time = forms.CharField()#"2018-07-29"
    finish_time = forms.CharField()#"2018-08-01"
    EventValue = forms.CharField()
    Keyword = forms.CharField()
class data(forms.Form):
    mydata = forms.CharField()
class Page(forms.Form):
    currentPageNum = forms.IntegerField()
    totalPageNum = forms.IntegerField()