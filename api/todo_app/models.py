from django.db import models
from json import JSONEncoder, JSONDecoder

# Create your models here.

class ToDoItem(models.Model):
    task_id = models.AutoField(primary_key=True)
    task_name = models.CharField(max_length=256)
    task_description = models.TextField()
    task_state = models.BooleanField()

    def __str__(self) -> str:
        return self.task_name

    def to_json(self) -> str:
        return JSONEncoder().encode(self.as_dict())

    def as_dict(self) -> dict:
        return {
            'id': self.task_id,
            'task_name': self.task_name,
            'task_description':self.task_description,
            'task_state': self.task_state
        }

def item_from_json(json: str):
    data: dict = JSONDecoder().decode(json)
    item = ToDoItem(task_id=data.get('id'), task_name=data.get('task_name'), task_description=data.get('task_description'), task_state=data.get('task_state'))
    return item
