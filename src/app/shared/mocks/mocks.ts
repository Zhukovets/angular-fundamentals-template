import { CardItem} from "@app/models/card.model";

 const mockCardItems: CardItem[] = [
    {
        title: 'Introduction to Angular',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum..',
        creationDate: new Date('2023-01-15'),
        duration: 120,
        authors: ['John Doe', 'Jane Smith']
    },
    {
        title: 'Advanced TypeScript Techniques',
        description: 'Learn advanced TypeScript features for better type safety in your Angular projects.',
        creationDate: new Date('2023-03-10'),
        duration: 90,
        authors: ['Alice Johnson']
    },
    {
        title: 'Building Reactive Forms in Angular',
        description: 'Create reactive forms and handle form validation in Angular applications.',
        creationDate: new Date('2023-05-20'),
        duration: 75,
        authors: ['Chris Brown', 'David Clark']
    }
    ]

export default mockCardItems;