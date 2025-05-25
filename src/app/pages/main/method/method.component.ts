import { Component } from '@angular/core';
import { HeroSectionComponent } from "../../../components/main/courses/hero-section/hero-section.component";
import { SuperpowerCardComponent } from "../../../components/main/method/superpower-card/superpower-card.component";
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-method',
  imports: [HeroSectionComponent, SuperpowerCardComponent, NgFor,RouterLink],
  templateUrl: './method.component.html',
  styleUrl: './method.component.css'
})
export class MethodComponent {
  cards = [
    {
      id: 'rime',
      title: 'Rime',
      icon: '/assets/methods/1.svg',
      alt: 'Pink icon representing Rime with dots and lines',
      subtitle: 'because word by word stays in your head',
      expandedText: `
        Creating rhymes is one of the best methods for intuitively memorizing words, phrases and sentences. Children from an early age are exposed to simple rhymes. In this way, they learn their native language, and the rhymes repeated in childhood are remembered for life. The same applies to learning English. It is a language without declension, rich in one- and two-syllable words, from which easy-to-learn rhymes can be created. Children like to repeat them and remember them quickly.

Rhyming develops phonemic hearing, thanks to which children learn the correct pronunciation of English. It is the best warm-up before learning to read and write. Finding rhymes is great fun, building children's engagement during classes. Some word combinations, especially the non-obvious ones like a pig in a wig, a stork with a fork, stimulate the imagination and bring a smile to the faces of students. All rhyming rhymes, songs and exercises are adapted to the level of English and the mental development of children.`,
    },
    {
      id: 'music',
      title: 'Music',
      icon: '/assets/methods/2.svg',
      alt: 'Pink icon representing Music with vertical oval shapes',
      subtitle: 'because the brain likes good rhythms',
      expandedText: `Music has been present in human life since time immemorial. The first sounds that reach us are the beating of the heart, measured steps, the doorbell or the barking of a dog. After birth, the experiences intensify and we hear lullabies at bedtime, we sing kindergarten hits ourselves, we hum hits from animated cartoons. Some melodies are permanently recorded in our memory. After many years, we can play them flawlessly. It is similar with songs, which is why they are successfully used in learning a foreign language.

Music is a pleasure - it releases emotions, improves mood and strengthens students' engagement, which is extremely important in the process of memorizing new words. Songs created for the needs of classes repeat correct grammatical structures, division into syllables and proper intonation of sentences. Repeated many times, they are catchy and can be easily remembered.

Because learning a language and learning new melodies stimulate the same structures in the brain, combining both of these elements in the form of practical exercises enhances the effect of learning English throughout the course.`,
    },
    {
      id: 'movement',
      title: 'Movement',
      icon: '/assets/methods/3.svg',
      alt: 'Pink icon representing Movement with horizontal oval shapes',
      subtitle: 'because it releases energy to learn',
      expandedText: `Movement is a natural need of a child, accompanying them from the first weeks of life. Even in their sleep, an infant dynamically changes its position in the bed, which is why we often call it a fidgeter or a wriggler. All children are kinesthetics, focused on being in constant movement. In this way, they discharge energy and show emotions and, importantly, acquire knowledge. This is because there is a network in the human nervous system that connects perception and motor activities. Its effectiveness depends on the degree to which all senses are used during learning.

Is it possible to sit through a class for 90 minutes? Absolutely not. That is why in our method we use dance, clapping, stomping, jumping, and charades. We intertwine static and movement exercises to diversify each lesson and engage all students.

Movement is not only a great tool for memorization, but also develops imagination and creativity. Children are excellent at showing concepts, even very abstract ones.`,
    },
    {
      id: 'relationships',
      title: 'Relationships',
      icon: '/assets/methods/4.svg',
      alt: 'Pink icon representing Rime with dots and lines',
      subtitle: 'because  they make you feel safe',
      expandedText: `
        From the beginning of life, people seek closeness and have a huge need to build relationships, which are satisfied by their parents in early childhood. Over time, the network connecting them with their loved ones grows and new links appear: friends from kindergarten, friends from the playground, new acquaintances. From then on, relationships do not only serve to build a sense of security, but also provide pleasure resulting from joint action, play, and experiencing emotions. They become a catalyst for intellectual and emotional development.

Success in learning English is largely determined by the relationships in the classroom. A good atmosphere promotes greater involvement in classes and better concentration. Experiencing emotions related to the course of the lesson unites the group and gives a signal that students can rely on each other.

The teacher, acting as a guide, puts the children's abilities and needs first. He listens to their questions and explains their doubts. With this attitude, he gains the group's trust and respect. He plays primarily a supporting role, and to a lesser extent an evaluative one. Thanks to good relationships and the resulting sense of security, he cultivates in students a natural curiosity about the world and an internal motivation to develop.

Children like to be taken seriously, which strengthens their self-esteem. We implement this basic assumption during every class. We believe that we can count on our students and we communicate this to them clearly. Thanks to this approach, children become more responsible and independent.

At Early Stage, we focus on the conscious participation of parents in their child's learning, which consists of being a good companion who supports the student's involvement and, in the event of any problems, informs the teacher about them on an ongoing basis. We organize special workshops on this topic. During the entire course, we ensure constant contact and open teacher-parent relations.
`,
    },
    {
      id: 'cooperation',
      title: 'Cooperation',
      icon: '/assets/methods/5.svg',
      alt: 'Pink icon representing Music with vertical oval shapes',
      subtitle: 'because together we can do more',
      expandedText: `We care about the comprehensive development of children. That is why from the very beginning we introduce various activities - we intertwine elements of individual work with exercises in pairs and larger groups. Thanks to frequent teamwork, our students have many opportunities to actively use and consolidate English. We engage all children and encourage them to interact with each other. We create a space for mutual support, inspiration and celebration of small successes. Our students discover individual talents and learn to use them for the good of the group and joint projects. We introduce elements of positive competition focused on mutual appreciation and respect. In this way, we increase motivation to learn and positively influence students' self-esteem.
`,
    },
    {
      id: 'communication',
      title: 'Communication',
      icon: '/assets/methods/6.svg',
      alt: 'Pink icon representing Movement with horizontal oval shapes',
      subtitle: 'because it releases energy to learn',
      expandedText: `Movement is a natural need of a child, accompanying them from the first weeks of life. Even in their sleep, an infant dynamically changes its position in the bed, which is why we often call it a fidgeter or a wriggler. All children are kinesthetics, focused on being in constant movement. In this way, they discharge energy and show emotions and, importantly, acquire knowledge. This is because there is a network in the human nervous system that connects perception and motor activities. Its effectiveness depends on the degree to which all senses are used during learning.

Is it possible to sit through a class for 90 minutes? Absolutely not. That is why in our method we use dance, clapping, stomping, jumping, and charades. We intertwine static and movement exercises to diversify each lesson and engage all students.

Movement is not only a great tool for memorization, but also develops imagination and creativity. Children are excellent at showing concepts, even very abstract ones.`,
    },
    {
      id: 'humor',
      title: 'Humor',
      icon: '/assets/methods/7.svg',
      alt: 'Pink icon representing Movement with horizontal oval shapes',
      subtitle: 'because endorphins and learning are a great duo',
      expandedText: `A smile is one of the first signs of joy shown by a baby. It is a common reaction to everyday situations in which a child feels happy. This is due to endorphins, a hormone released during laughter, which causes self-satisfaction and well-being. Therefore, when a child is stimulated by laughter, they are more likely to acquire new skills.

By introducing humorous elements into the lesson, we not only accelerate the acquisition of a foreign language, but also develop a sense of humor in our students. In a cheerful environment, it is easier to create a friendly atmosphere between children and better motivation to work.

Humor makes every class more attractive and diverse. We introduce it in various ways: through absurd rhymes, funny stories, funny sound effects or funny graphics. Thanks to this, children become more active and show greater courage to talk`,
    },
    {
      id: 'creativity',
      title: 'Creativity',
      icon: '/assets/methods/8.svg',
      alt: 'Pink icon representing Rime with dots and lines',
      subtitle: 'because the path to the goal should be interesting',
      expandedText: `We build an atmosphere of openness and safety, thanks to which students can freely share their ideas. They participate in activities that stimulate creativity - they prepare artistic, linguistic and multimedia projects, reenact scenes, take on roles. In this way, they learn to look at issues from many perspectives. To stimulate the imagination, we use visualizations - photos, images, icons, graphics that evoke non-obvious associations, leading students towards innovative solutions. Our method of teaching English involves frequent use of the brainstorming technique, which allows for the generation of many different ideas. By creating space for creativity and experimentation, we allow students to develop language competences with openness and courage`,
    },
    {
      id: 'critical-thinking',
      title: 'Critical thinking',
      icon: '/assets/methods/9.svg',
      alt: 'Pink icon representing Music with vertical oval shapes',
      subtitle: 'because it helps to understand the world',
      expandedText: `We prepare students for independent, critical thinking and encourage them to use it as a tool. Using a variety of tasks, we inspire them to formulate and verify hypotheses, look for their own answers to important questions, compare information and draw conclusions. By asking the simplest questions, we start the thought process, igniting the ability to reflect on the world and their own development. We focus on analysis, deduction and summarization, so that students can discover their own opinion. In practice, we use structures and strategies that help them present their views in a thoughtful and understandable way. All these activities stimulate language development and raise the skills of effective oral and written communication to a higher level`,
    },
    {
      id: 'autonomy',
      title: 'Autonomy',
      icon: '/assets/methods/10.svg',
      alt: 'Pink icon representing Movement with horizontal oval shapes',
      subtitle: 'because it gives a sense of agency',
      expandedText: `Building independence is one of the goals of our English teaching method. That is why we entrust even the youngest students with responsibilities appropriate to their age, expanding them as their abilities grow. This increases their engagement in learning, giving them a sense of fulfillment and satisfaction. Thanks to regular tasks intended for their own work, children learn to be systematic and evaluate their progress. Through exercises in pairs and groups, we develop the ability to independently correct mistakes and provide each other with constructive feedback. The teacher encourages risk-taking and ensures that students have a sense of achieving the goals they have set. Therefore, they play the role of a companion in the educational process, in which the student and their development play the main roles.
`,
    },
    {
      id: 'spirality',
      title: 'Spirality',
      icon: '/assets/methods/11.svg',
      alt: 'Pink icon representing Movement with horizontal oval shapes',
      subtitle: 'because it stimulates development and memorization',
      expandedText: `Learning is a complex process that has a spiral character. Forgetting is an inherent element of it, which is why we give students the opportunity to return to the material they have covered: at the revision stage of the lesson, after each chapter of the textbook, in the semester and yearly summary. Our method of teaching English harmonizes with the natural way of acquiring knowledge and allows you to discover vocabulary, phrases and grammar gradually, in a dimension adapted to the age and language level of the students. In subsequent years, they return to the topics they have already learned, consolidate them and enrich them with more and more complex elements. At each stage, they gain communicative competences that allow them to communicate in English - year by year in an increasingly advanced way.
`,
    },
    {
      id: "Author-materials",
      title: "Author's materials",
      icon: "/assets/methods/12.svg",
      alt: 'Pink icon representing Movement with horizontal oval shapes',
      subtitle: 'because they attract attention like a magnet',
      expandedText: `Children love books. They usually start with the culinary stage – they check how they taste, but over time they look through them with interest. This is how they learn colours, shapes, numbers. As they grow up, they need stronger stimuli to focus their attention on the book for longer. That is why we place special emphasis on the attractiveness of our textbooks while maintaining a high level of content. The materials we create are the pillar of the unique programme implemented by the Early Stage school. They arouse students' curiosity and support the process of language acquisition. A good English textbook is great fun for children. We know this from experience.

Each Early Stage class is an intensive 45 to 90 minutes of contact with English and 20 to 40 new words a week. The learning materials we design support the work of the teacher and students on an ongoing basis, expand the core curriculum and prepare for the British Cambridge exams for children and young people.

Our materials grow and develop together with the students, adapting to their level and ability to acquire knowledge. They were created over the years and are constantly changing, corresponding with the school education system and the current needs of children. Thanks to a team of experienced methodologists and practitioners led by Joanna Zarańska - the author of many valued publications for the Polish and foreign markets - we are always up to date and provide our students with the best textbooks for creative learning of English.

Thanks to well-thought-out materials, our students are becoming more and more independent users of English year by year. As teenagers, they can communicate in English very well. We achieve this effect thanks to our books developed in a comprehensive manner to refer to different types of children's intelligence. For visual learners, we have prepared interesting graphic materials, illustrations, picture cards, expressions and art and language projects. For auditory learners - hundreds of musical pieces, songs, rhymes. For verbally developed children - word games, poems, conversations. For kinesthetic learners - movement exercises, puns, dances, games. Carrying out joint projects promotes the development of interpersonal skills.

In addition to language components, our materials contain cultural elements that open children to the world. Apart from topics related to the customs of other countries, there are also thematic projects that our students successfully implement every year.`,
    },
  ];

  expandedCardId: string | null = '';
  toggleCard(cardId: any): void {
    if (this.expandedCardId === cardId) {
      this.expandedCardId = null; // Collapse the card if it's already expanded
    } else {
      this.expandedCardId = cardId; // Expand the selected card
    }
  }
}
