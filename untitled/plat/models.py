# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Gkg(models.Model):
    date = models.CharField(db_column='DATE', max_length=255, blank=True, null=True)  # Field name made lowercase.
    sourcecollectionidentifier = models.CharField(db_column='SourceCollectionIdentifier', max_length=255, blank=True, null=True)  # Field name made lowercase.
    sourcecommonname = models.CharField(db_column='SourceCommonName', max_length=255, blank=True, null=True)  # Field name made lowercase.
    documentidentifier = models.CharField(db_column='DocumentIdentifier', max_length=255, blank=True, null=True)  # Field name made lowercase.
    counts = models.CharField(db_column='Counts', max_length=255, blank=True, null=True)  # Field name made lowercase.
    v2counts = models.CharField(db_column='V2Counts', max_length=255, blank=True, null=True)  # Field name made lowercase.
    themes = models.CharField(db_column='Themes', max_length=255, blank=True, null=True)  # Field name made lowercase.
    v2themes = models.CharField(db_column='V2Themes', max_length=255, blank=True, null=True)  # Field name made lowercase.
    locations = models.CharField(db_column='Locations', max_length=255, blank=True, null=True)  # Field name made lowercase.
    v2locations = models.CharField(db_column='V2Locations', max_length=255, blank=True, null=True)  # Field name made lowercase.
    persons = models.CharField(db_column='Persons', max_length=255, blank=True, null=True)  # Field name made lowercase.
    v2persons = models.CharField(db_column='V2Persons', max_length=255, blank=True, null=True)  # Field name made lowercase.
    organizations = models.CharField(db_column='Organizations', max_length=255, blank=True, null=True)  # Field name made lowercase.
    v2organizations = models.CharField(db_column='V2Organizations', max_length=255, blank=True, null=True)  # Field name made lowercase.
    tone = models.CharField(db_column='Tone', max_length=255, blank=True, null=True)  # Field name made lowercase.
    posscore = models.CharField(db_column='PosScore', max_length=255, blank=True, null=True)  # Field name made lowercase.
    negscore = models.CharField(db_column='NegScore', max_length=255, blank=True, null=True)  # Field name made lowercase.
    polarity = models.CharField(db_column='Polarity', max_length=255, blank=True, null=True)  # Field name made lowercase.
    ard = models.CharField(db_column='ARD', max_length=255, blank=True, null=True)  # Field name made lowercase.
    srd = models.CharField(db_column='SRD', max_length=255, blank=True, null=True)  # Field name made lowercase.
    wordcount = models.CharField(db_column='WordCount', max_length=255, blank=True, null=True)  # Field name made lowercase.
    dates = models.CharField(db_column='Dates', max_length=255, blank=True, null=True)  # Field name made lowercase.
    gcam = models.CharField(db_column='GCAM', max_length=255, blank=True, null=True)  # Field name made lowercase.
    sharingimage = models.CharField(db_column='SharingImage', max_length=255, blank=True, null=True)  # Field name made lowercase.
    relatedimages = models.CharField(db_column='RelatedImages', max_length=255, blank=True, null=True)  # Field name made lowercase.
    socialimageembeds = models.CharField(db_column='SocialImageEmbeds', max_length=255, blank=True, null=True)  # Field name made lowercase.
    socialvideoembeds = models.CharField(db_column='SocialVideoEmbeds', max_length=255, blank=True, null=True)  # Field name made lowercase.
    quotations = models.CharField(db_column='Quotations', max_length=255, blank=True, null=True)  # Field name made lowercase.
    allnames = models.CharField(db_column='AllNames', max_length=255, blank=True, null=True)  # Field name made lowercase.
    amounts = models.CharField(db_column='Amounts', max_length=255, blank=True, null=True)  # Field name made lowercase.
    translationinfo = models.CharField(db_column='TranslationInfo', max_length=255, blank=True, null=True)  # Field name made lowercase.
    extras = models.CharField(db_column='Extras', max_length=255, blank=True, null=True)  # Field name made lowercase.
    ipbelong = models.CharField(db_column='IpBelong', max_length=255, blank=True, null=True)  # Field name made lowercase.
    title = models.CharField(db_column='Title', max_length=255, blank=True, null=True)  # Field name made lowercase.
    content = models.CharField(db_column='Content', max_length=255, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'gkg'


class Query(models.Model):
    name = models.CharField(max_length=50)
    start = models.CharField(max_length=50)
    end = models.CharField(max_length=50)
    key = models.CharField(max_length=50)
    theme = models.CharField(max_length=50, blank=True, null=True)
    person = models.CharField(max_length=50, blank=True, null=True)
    location = models.CharField(max_length=50, blank=True, null=True)
    organization = models.CharField(max_length=50, blank=True, null=True)
    region = models.CharField(max_length=50)

    class Meta:
        managed = False
        db_table = 'query'
