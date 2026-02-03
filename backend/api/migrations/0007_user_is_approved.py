# Generated manually for add_user_is_approved

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_event_action_button_label_event_action_button_link_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='is_approved',
            field=models.BooleanField(blank=True, default=None, null=True),
        ),
    ]
