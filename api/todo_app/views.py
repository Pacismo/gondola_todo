from django.http import HttpResponse, HttpRequest, Http404
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from json import JSONEncoder
from .models import ToDoItem, item_from_json

# Create your views here.

sample_tasks: list[dict] = [
    {
        'task_name': "Do laundry",
        'task_description': "Clean, dry, and fold clothes",
        'task_state': "TODO",
        'id': 0,
    },
    {
        'task_name': "Iron shirts",
        'task_description': "Iron suit and cotton pants",
        'task_state': "TODO",
        'id': 1,
    },
    {
        'task_name': "Refill cat feeder",
        'task_description': "Buy new cat food and fill automatic feeder",
        'task_state': "DONE",
        'id': 2,
    },
    {
        'task_name': "Build IKEA desk",
        'task_description': "Desk arrives 10/24",
        'task_state': "TODO",
        'id': 3,
    },
    {
        'task_name': "Update website",
        'task_description': "Add recent projects",
        'task_state': "DONE",
        'id': 4,
    },
]

def index(request: HttpRequest):
    return HttpResponse("Hello")

@csrf_exempt
def get_tasks(request: HttpRequest):
    tasks = []

    for task in ToDoItem.objects.all().iterator():
        tasks.append(task.as_dict())

    return HttpResponse(JSONEncoder().encode(tasks))

@require_POST
@csrf_exempt
def add_task(request: HttpRequest):
    task = item_from_json(request.body)
    task.save()
    return HttpResponse("Added task %s successfully!"%task)

@require_POST
@csrf_exempt
def remove_task(request: HttpRequest, task_id: int):
    pass
