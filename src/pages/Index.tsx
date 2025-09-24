import { useState } from 'react';
import { Todo } from '@/types';
import useLocalStorage from '@/hooks/useLocalStorage';
import Layout from '@/components/Layout';
import AddTodoForm from '@/components/AddTodoForm';
import TodoItem from '@/components/TodoItem';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [activeTab, setActiveTab] = useState('all');

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const updateTodo = (id: string, text: string) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text } : todo))
    );
  };

  const filteredTodos = todos.filter(todo => {
    if (activeTab === 'active') return !todo.completed;
    if (activeTab === 'completed') return todo.completed;
    return true;
  });

  const activeCount = todos.filter(t => !t.completed).length;
  const completedCount = todos.length - activeCount;

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">My Tasks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <AddTodoForm onAdd={addTodo} />
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">All ({todos.length})</TabsTrigger>
                <TabsTrigger value="active">Active ({activeCount})</TabsTrigger>
                <TabsTrigger value="completed">Completed ({completedCount})</TabsTrigger>
              </TabsList>
              <TabsContent value={activeTab}>
                <div className="space-y-3 mt-4">
                  {filteredTodos.length > 0 ? (
                    filteredTodos.map((todo) => (
                      <TodoItem
                        key={todo.id}
                        todo={todo}
                        onToggle={toggleTodo}
                        onDelete={deleteTodo}
                        onUpdate={updateTodo}
                      />
                    ))
                  ) : (
                    <p className="text-center text-muted-foreground py-8">
                      {activeTab === 'completed' ? "No completed tasks yet!" : "You're all caught up!"}
                    </p>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Index;