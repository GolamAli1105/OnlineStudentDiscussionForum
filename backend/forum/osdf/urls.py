from django.urls import path
from . import views

urlpatterns= [
    path('posts/',views.PostListCreate.as_view(),name= "post-list"),
    path('posts/delete/<int:pk>/',views.PostDelete.as_view(),name= "delete-post"),
    path('posts/vote/<int:pk>/', views.PostVoteAPIView.as_view(), name='post-vote'),
    path('posts/<int:pk>/report/', views.ReportPostAPIView.as_view(), name="report-post"),
    path('posts/yaya/', views.yaya.as_view(), name= "yaya")
]