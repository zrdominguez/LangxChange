from flask_wtf import FlaskForm
from better_profanity import profanity
from wtforms import StringField, SelectField
from wtforms.validators import DataRequired, ValidationError


profanity.load_censor_words()

def profanity_check(form, field):
  if profanity.contains_profanity(field.data):
    raise ValidationError('Profanity is not an acceptable Collection name.')

class CollectionForm(FlaskForm):
  collectionName = StringField('Collection Name', validators=[DataRequired(), profanity_check])
  language = SelectField(
    'Language',
    choices=[
      ('English', 'English'),
      ('Japanese', 'Japanese'),
      ('Spanish', 'Spanish')
    ],
    validators=[DataRequired(message="Please select a language.")]
  )
