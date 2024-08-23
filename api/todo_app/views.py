from django.http import HttpResponse, HttpRequest, HttpResponseBadRequest, Http404
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from json import JSONEncoder, JSONDecoder
from .models import ToDoItem, item_from_json

# Create your views here.

@csrf_exempt
def get_tasks(request: HttpRequest):
    tasks = []

    for task in ToDoItem.objects.all().iterator():
        tasks.append(task.as_dict())

    return HttpResponse(JSONEncoder().encode(tasks))

@require_POST
@csrf_exempt
def add_task(request: HttpRequest):
    if request.content_type != "application/json":
        return HttpResponseBadRequest("Expected JSON body")

    task = item_from_json(str(request.body, 'utf-8'))
    task.save()
    return HttpResponse("Added task %s successfully!"%task)

@require_POST
@csrf_exempt
def mark_task(request: HttpRequest):
    if request.content_type != "application/json":
        return HttpResponseBadRequest("Expected JSON body")

    params = JSONDecoder().decode(str(request.body, 'utf-8'))
    tid = params.get('id')
    state = params.get('task_state')

    if tid is None or state is None:
        return HttpResponseBadRequest("Expected task ID and new state in body")

    if state != "TODO" and state != "DONE":
        return HttpResponseBadRequest("Expected state to be either \"TODO\" or \"DONE\"")

    if not ToDoItem.objects.contains(task_id=tid):
        return Http404("Object does not exist")

    task = ToDoItem.objects.get(task_id=tid)
    task.task_state = state == "DONE"
    task.save()

    return HttpResponse("Successfully update task %s"%task)

@require_POST
@csrf_exempt
def remove_task(request: HttpRequest):
    if request.content_type == "application/json":
        tid: int | None = JSONDecoder().decode(str(request.body, 'utf-8')).get('id')
        if tid is None:
            return HttpResponseBadRequest("Expected an ID, got None")

        if not ToDoItem.objects.exists(task_id=tid):
            return Http404("Object does not exist")

        ToDoItem.objects.get(task_id=tid).delete()

        return HttpResponse("Successfully removed task")
    pass
