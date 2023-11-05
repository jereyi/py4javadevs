export type LessonDetail = {
    title: string;
    desc: string;
    next: string | null;
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
    javaSolution: string;
    pythonSolution: string;
  }

export type UserInfo = {
    netid: string;
    displayName: string;
    lastLogin: Date;
    completedLessons: string[];
  }