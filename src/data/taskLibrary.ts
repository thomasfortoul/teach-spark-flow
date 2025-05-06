
import { Task } from "@/types/task";

export const taskLibrary: Task[] = [
  {
    id: "create-quiz",
    title: "Create Multiple-Choice Quiz",
    description: "Create a comprehensive multiple-choice quiz for your students.",
    steps: [
      {
        id: "quiz-topic",
        title: "Select Quiz Topic",
        description: "Choose the main topic for your multiple-choice quiz.",
        checkpoint: "Have you selected a topic?"
      },
      {
        id: "learning-objectives",
        title: "Define Learning Objectives",
        description: "Specify what students should learn from this quiz.",
        checkpoint: "Have you defined at least 2-3 learning objectives?"
      },
      {
        id: "question-types",
        title: "Determine Question Types",
        description: "Decide on the types of questions to include (e.g., recall, application, analysis).",
        checkpoint: "Have you selected at least 2 question types?"
      },
      {
        id: "draft-questions",
        title: "Draft Questions",
        description: "Create the actual questions and answer options.",
        checkpoint: "Have you drafted at least 5 questions with answers?"
      },
      {
        id: "review-finalize",
        title: "Review and Finalize",
        description: "Review the entire quiz for coherence and completeness.",
        checkpoint: "Is your quiz ready for students?"
      }
    ]
  },
  {
    id: "draft-lesson",
    title: "Draft Lesson Plan",
    description: "Create a structured lesson plan for your class.",
    steps: [
      {
        id: "lesson-topic",
        title: "Choose Lesson Topic",
        description: "Select the main topic for your lesson.",
        checkpoint: "Have you selected a clear lesson topic?"
      },
      {
        id: "lesson-objectives",
        title: "Set Learning Objectives",
        description: "Define what students should achieve by the end of the lesson.",
        checkpoint: "Have you defined 2-3 specific learning objectives?"
      },
      {
        id: "teaching-methods",
        title: "Select Teaching Methods",
        description: "Choose appropriate teaching methods and activities.",
        checkpoint: "Have you selected at least 2 teaching methods?"
      },
      {
        id: "timeline",
        title: "Create Timeline",
        description: "Organize activities into a coherent timeline.",
        checkpoint: "Does your timeline cover the entire lesson period?"
      },
      {
        id: "assessment-strategy",
        title: "Plan Assessment Strategy",
        description: "Determine how you'll assess student understanding.",
        checkpoint: "Have you planned how to check student progress?"
      }
    ]
  }
];

export const getTaskById = (taskId: string): Task | undefined => {
  return taskLibrary.find(task => task.id === taskId);
};
