import { ElfWorkshop } from '../src/elfWorkshop'

describe('ElfWorkshop Tasks', () => {
  // rename this to addTask should add a task
  test('removeTask should add a task', () => {
    const workshop = new ElfWorkshop()
    workshop.addTask('Build toy train')
    expect(workshop.taskList).toContain('Build toy train')
  })
  // Tests 1, 2 and 3 are testing the same thing
  // One of the tests should perhaps test that the the previous task is not overwritten
  // By adding two tasks
  test('test2 checks for task addition', () => {
    const workshop = new ElfWorkshop()
    workshop.addTask('Craft dollhouse')
    expect(workshop.taskList.includes('Craft dollhouse')).toBeTruthy()
  })

  test('test2 checks for task addition', () => {
    const workshop = new ElfWorkshop()
    workshop.addTask('Paint bicycle')
    expect(workshop.taskList.includes('Paint bicycle')).toBeTruthy()
  })

  test('Should handle empty tasks correctly', () => {
    const workshop = new ElfWorkshop()
    workshop.addTask('')
    expect(workshop.taskList.length).toBe(0)
  })

  test('Task removal functionality', () => {
    const workshop = new ElfWorkshop()
    workshop.addTask('Wrap gifts')
    const removedTask = workshop.completeTask()
    expect(removedTask).toBe('Wrap gifts')
    expect(workshop.taskList.length).toBe(0)
  })
})
