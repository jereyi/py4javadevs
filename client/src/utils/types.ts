export type LessonDetail = {
    title: string;
    desc: string;
    prev: string | null;
    next: string | null;
    hasExercises: boolean;
}

export type LessonContextType = {
lesson: string;
updateLesson: (lesson: string) => void;
};

export type LanguageOption = {
    id: number;
    name: string;
    label: string;
    value: string;
    default: string;
  }

export type ThemeOption = {
    label: string;
    value: string;
    key: string;
}
export type Status = {
    id: number | undefined;
    description: string | undefined;
}
export type OutputDetail = {
    status: Status | undefined;
    memory: string | undefined;
    time: string | undefined;
    compile_output: string | undefined;
    stdout: string | undefined;
    stderr: string | undefined;
}

export type ExerciseDetail = {
    question: string;
    java: string;
    python: string;
  }

export type UserInfo = {
    netid: string;
    displayName: string;
    firstLogin: Date;
    completedLessons: string[];
  }