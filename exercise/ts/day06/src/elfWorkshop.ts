export class ElfWorkshop {
  taskList: string[] = []
  // could test for all kinds of empty values like " " with regex
  addTask(task: string): void {
    if (task !== '') {
      this.taskList.push(task)
    }
  }
  // Do we always want to remove the first task?
  completeTask(): string {
    if (this.taskList.length > 0) {
      return this.taskList.shift()
    }
    return null
  }
}
