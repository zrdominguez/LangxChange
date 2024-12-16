from flask_wtf import FlaskForm
from wtforms import StringField, RadioField
from wtforms.validators import DataRequired, ValidationError, NumberRange
from better_profanity import profanity

profanity.load_censor_words()

def profanity_check(form, field):
  if profanity.contains_profanity(field.data):
    raise ValidationError('Profanity is not acceptable in a review please try again.')


class NewReviewForm(FlaskForm):
  review = StringField('Review', validators=[DataRequired(), profanity_check])
  rating = RadioField(
    "Rating",
    choices=[(str(i), f"{i} stars") for i in range(1, 6)],
    coerce=int,
    validators=[DataRequired(), NumberRange(min=1, max=5)]
  )
