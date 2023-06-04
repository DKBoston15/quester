type Quiz = {
  id: number;
  title: string;
  score: number;
  questions: {
    id: number;
    question: string;
    options: Record<string, string>;
    multiAnswer?: string[];
    answer?: string;
  }[];
};

type Course = {
  courseTitle: string;
  quizzes: Quiz[];
};

export const toSnakeCase = (str: string): string => {
  // Replace all non-alphanumeric characters with underscores
  const underscored = str.replace(/[^a-zA-Z0-9]/g, '_');
  // Convert to lowercase and replace spaces with underscores
  const lowercased = underscored.toLowerCase().replace(/\s+/g, '_');
  // Return the snake_case string
  return lowercased;
};

export const findQuizByTitle = (
  quizzes: Course[],
  title: string
): Quiz | undefined => {
  for (const course of quizzes) {
    const quiz = course.quizzes.find((q) => toSnakeCase(q.title) === title);
    if (quiz) {
      return quiz;
    }
  }
};

export const quizzes: Course[] = [
  {
    courseTitle: 'APA',
    quizzes: [
      {
        id: 1,
        title: 'Title Page',
        score: 0,
        questions: [
          {
            id: 1,
            question: 'In APA style, you should always include a title page.',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'True'
          },
          {
            id: 2,
            question:
              'Which of the following examples shows the correct formatting for the title of a paper on the title page',
            options: {
              A: '<strong>Title of paper</strong>',
              B: 'TITLE OF PAPER',
              C: 'Title of Paper',
              D: '<strong>Title of Paper</strong>'
            },
            answer: 'Title of Paper'
          },
          {
            id: 3,
            question: 'The title page for a professional paper must include:',
            options: {
              A: 'Running head',
              B: 'Title of paper',
              C: 'Author names',
              D: 'Affiliations',
              E: 'Some of the above',
              F: 'All of the above'
            },
            answer: 'All of the above'
          },
          {
            id: 4,
            question:
              '“Running head” should always appear on the title page’s running title.',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'False'
          },
          {
            id: 5,
            question: 'The title of a paper should be:',
            options: {
              A: 'Centered, not bolded, single spaced, located at the top of the page',
              B: 'Centered, bolded, single space, three or four lines from the top of the page',
              C: 'Centered, bolded, double spaced, three or four lines from the top of the page',
              D: 'Centered, bolded, double spaced, halfway down the length of the page'
            },
            answer:
              'Centered, bolded, double spaced, three or four lines from the top of the page'
          },
          {
            id: 6,
            question:
              'Use an ampersand (&) to separate author names on the title page',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'False'
          },
          {
            id: 7,
            question:
              'Each unique affiliation should appear on an individual line.',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'True'
          },
          {
            id: 8,
            question:
              'If all authors share the same affiliation, superscript numerals are not used to identify the affiliation.',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'True'
          },
          {
            id: 9,
            question:
              'Which elements of a title page are not written using title case capitalization.',
            options: {
              A: 'Title of paper',
              B: 'Authors',
              C: 'Affiliations',
              D: 'Running head',
              E: 'None of the above'
            },
            answer: 'Running head'
          },
          {
            id: 10,
            question:
              'Which of the following is found on a student, but not a professional title page',
            options: {
              A: 'Due date',
              B: 'Title of paper',
              C: 'Affiliation',
              D: 'Page number'
            },
            answer: 'Due date'
          }
        ]
      },
      {
        id: 2,
        title: 'Title',
        score: 0,
        questions: [
          {
            id: 11,
            question: 'A title may not exceed 50 characters.',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'False'
          },
          {
            id: 12,
            question: 'A title should be:',
            options: {
              A: 'Centered, bolded, double spaced',
              B: 'Centered, not bolded, single spaced',
              C: 'Centered, bolded, single spaced',
              D: 'Left aligned, bolded, double spaced'
            },
            answer: 'Centered, bolded, double spaced'
          },
          {
            id: 13,
            question: 'A good title should not be:',
            options: {
              A: 'Concise',
              B: 'Fully explanatory',
              C: 'Used as a statement for abstracting',
              D: 'None of the above'
            },
            answer: 'None of the above'
          },
          {
            id: 14,
            question: 'A good title should not include the following word(s):',
            options: {
              A: 'Method',
              B: 'Results',
              C: 'Study of',
              D: 'All of the above'
            },
            answer: 'All of the above'
          },
          {
            id: 15,
            question: 'Abbreviations are not allowed in titles.',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'False'
          },
          {
            id: 16,
            question: 'Titles do not use end punctuation.',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'True'
          },
          {
            id: 17,
            question: 'Titles should:',
            options: {
              A: 'Summarize the main ideas of the paper',
              B: 'Convey a sense of style',
              C: 'Identify variables',
              D: 'Not reveal theoretical issues',
              E: 'All of the above',
              F: 'None of the above'
            },
            answer: 'Not reveal theoretical issues'
          },
          {
            id: 18,
            question: 'A good title includes key words from the paper.',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'True'
          },
          {
            id: 19,
            question: 'Scientific names should not be italicized in a title.',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'False'
          },
          {
            id: 20,
            question:
              'The complete title of a paper always appears on, or in, the:',
            options: {
              A: 'First page of the paper',
              B: 'Running head',
              C: 'Last page of the paper',
              D: 'All of the above',
              E: 'None of the above'
            },
            answer: 'First page of the paper'
          }
        ]
      },
      {
        id: 3,
        title: 'Headers and Footers',
        score: 0,
        questions: [
          {
            id: 21,
            question: 'What is a running head?',
            options: {
              A: 'A header containing the author’s last name and page number',
              B: 'A header containing an abbreviated title, up to 50 characters, in all upper case',
              C: 'A header containing the whole title and page number',
              D: 'A header containing the author’s last name and whole title'
            },
            answer:
              'A header containing an abbreviated title, up to 50 characters, in all upper case'
          },
          {
            id: 22,
            question: 'The running head is located:',
            options: {
              A: 'In the left footer',
              B: 'In the left header',
              C: 'In the right footer',
              D: 'In the right header'
            },
            answer: 'In the left header'
          },
          {
            id: 23,
            question:
              'An ampersand may not be used in the place of “and” within a header’s running title.',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'False'
          },
          {
            id: 24,
            question:
              'An abbreviated running head may not rearrange the order of text in the paper’s title.',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'False'
          },
          {
            id: 25,
            question: 'Select the correctly formatted running head.',
            options: {
              A: 'Running Head: The Role of Formatting in Graduate Education in the 21st Century',
              B: 'The Role of Formatting in Graduate Education in the 21st Century',
              C: 'THE ROLE OF FORMATTING IN GRADUATE EDUCATION',
              D: 'THE ROLE OF FORMATTING IN GRADUATE EDUCATION IN THE 21ST CENTURY'
            },
            answer: 'THE ROLE OF FORMATTING IN GRADUATE EDUCATION'
          },
          {
            id: 26,
            question: 'Pagination should occur:',
            options: {
              A: 'On all pages',
              B: 'On all pages except for the title page',
              C: 'On all pages except the Reference section',
              D: 'On all pages except the Supplementary section'
            },
            answer: 'On all pages'
          },
          {
            id: 27,
            question: 'Where should pagination occur in a paper?',
            options: {
              A: 'Centered, in the footer',
              B: 'Right hand corner, in the header',
              C: 'Left hand corner, in the footer',
              D: 'Centered, in the header',
              E: 'A or B',
              F: 'C or D'
            },
            answer: 'Right hand corner, in the header'
          },
          {
            id: 28,
            question: 'Which pagination style follows APA guidelines',
            options: {
              A: '-1-',
              B: '1',
              C: '(1)',
              D: '<strong>1</strong>',
              E: 'A or C',
              F: 'B or D'
            },
            answer: '1'
          },
          {
            id: 29,
            question: 'APA does not generally use footers.',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'True'
          },
          {
            id: 30,
            question:
              'The margins for headers follows the same formatting structure as the body of a paper.',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'True'
          }
        ]
      },
      {
        id: 4,
        title: 'Body',
        score: 0,
        questions: [
          {
            id: 31,
            question: 'How should paragraphs be aligned on the page?',
            options: {
              A: 'Centered',
              B: 'Left-aligned',
              C: 'Right-aligned'
            },
            answer: 'Left-aligned'
          },
          {
            id: 32,
            question:
              'Identify the proper tab indention for the first line of paragraphs.',
            options: {
              A: 'Flush left',
              B: '0.25 inch',
              C: '0.33 inch',
              D: '0.50 inch',
              E: '1 inch'
            },
            answer: '0.50 inch'
          },
          {
            id: 33,
            question:
              'Identify one paper section not considered one of the four major sections of a paper.',
            options: {
              A: 'Title Page',
              B: 'Abstract',
              C: 'Main Body',
              D: 'References',
              E: 'Tables and Figures',
              F: 'Supplementary Materials',
              G: 'Appendices'
            },
            multiAnswer: [
              'Tables and Figures',
              'Supplementary Materials',
              'Appendices'
            ]
          },
          {
            id: 34,
            question: 'A paper’s title should be',
            options: {
              A: 'Centered, bolded, sentence case capitalization',
              B: 'Centered, not bolded, sentence case capitalization',
              C: 'Centered, not bolded, title case capitalization',
              D: 'Centered, bolded, title case capitalization'
            },
            answer: 'Centered, bolded, title case capitalization'
          },
          {
            id: 35,
            question:
              'Identify the correct use of the word for % in the body of a paper:',
            options: {
              A: '100 percent',
              B: '100 per cent',
              C: 'The percent of participants equaled ...',
              D: 'We ask ourselves, does a greater per cent of ...'
            },
            answer: 'The percent of participants equaled ...'
          },
          {
            id: 36,
            question:
              'Identify the correct use of the percent symbol in the body of a paper:',
            options: {
              A: '100%',
              B: '100 %',
              C: 'One hundred %',
              D: 'The % of participants equaled ...',
              E: 'We ask ourselves, does a greater % ...'
            },
            answer: '100%'
          },
          {
            id: 37,
            question:
              'Items and phrasing in a lettered list should parallel across the stem and list. (T/F)',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'True'
          },
          {
            id: 38,
            question: 'Numbered lists should be used when:',
            options: {
              A: 'Ordinal position is important',
              B: 'Information is in the form of complete sentences or paragraphs',
              C: 'Sequential steps define a process',
              D: 'All of the above',
              E: 'None of the above'
            },
            answer: 'All of the above'
          },
          {
            id: 39,
            question: 'Bulleted lists should be used when:',
            options: {
              A: 'Ordinal position is important',
              B: 'Information is in the form of complete sentences or paragraphs',
              C: 'Sequential steps define a process',
              D: 'All of the above',
              E: 'None of the above'
            },
            answer: 'None of the above'
          },
          {
            id: 40,
            question:
              'Italics should never be used in the Main Body of a paper. (T/F)',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'False'
          }
        ]
      },
      {
        id: 5,
        title: 'References',
        score: 0,
        questions: [
          {
            id: 41,
            question: 'Each reference contains what four elements?',
            options: {
              A: 'Author, Date, Methodology, Source',
              B: 'Author, Title, Location, Source',
              C: 'Author, Date, Title, Source',
              D: 'Author, Date, Source, Location',
              E: 'None of the above'
            },
            answer: 'Author, Date, Title, Source'
          },
          {
            id: 42,
            question:
              'Identify the correct format of a reference for an unpublished manuscript from a graduate student',
            options: {
              A: 'Author, A. (year). Title of manuscript [Unpublished manuscript]. University Department, University Name.',
              B: 'Author, A. (year). Title of manuscript. University Department, University Name.',
              C: 'Author, A. (year). Title of manuscript [Unpublished manuscript]. University Department, University Name.',
              D: 'Author, A. (year). Title of manuscript [Unpublished manuscript]. Supervising professor, University Department, University Name.',
              E: 'None of the above'
            },
            answer:
              'Author, A. (year). Title of manuscript [Unpublished manuscript]. University Department, University Name.'
          },
          {
            id: 43,
            question: 'Each journal reference must contain page numbers? (T/F)',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'False'
          },
          {
            id: 44,
            question:
              'Identify the correct format of a reference for a monograph as part of a journal issue.',
            options: {
              A: 'Author, A. (year). Title of manuscript [Monograph]. Journal, Vol(Issue), page(s). DOI',
              B: 'Author, A. (year). Title of manuscript [Monograph]. Journal, Vol(Issue), page(s). DOI',
              C: 'Author, A. (year). Title of manuscript [Monograph]. Journal, Vol(Issue), page(s). DOI',
              D: 'Author, A. (year). Title of manuscript. Journal, Vol(Issue, Monograph number), page(s). DOI',
              E: 'None of the above'
            },
            answer:
              'Author, A. (year). Title of manuscript [Monograph]. Journal, Vol(Issue), page(s). DOI'
          },
          {
            id: 45,
            question:
              'References with the same author and year or listed alphabetically by title, ignoring “The” and “A”. (T/F)',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'True'
          },
          {
            id: 46,
            question:
              'Only a reference with complete information can be placed in the final draft of a paper. (T/F)',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'False'
          },
          {
            id: 47,
            question:
              'Identify the correct format of a reference for an edited book.',
            options: {
              A: 'Editor, E. E. (Ed.). (year). Title of work. Publisher. DOI',
              B: 'Editor, E. E. (Ed.). (year). Title of work. Publisher. DOI',
              C: 'Editor, E. E. (Ed.). (year). Title of work. Publisher. Country, City. DOI',
              D: 'Editor, E. E. (Ed.). (year). Title of work. Publisher. DOI',
              E: 'None of the above'
            },
            answer: 'Editor, E. E. (Ed.). (year). Title of work. Publisher. DOI'
          },
          {
            id: 48,
            question:
              'To add a reference with no author, move the source of the reference to the author position of the reference. (T/F)',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'False'
          },
          {
            id: 49,
            question:
              'Identify the correct format of a reference for a dissertation',
            options: {
              A: 'Author, A. (year). Title [Doctoral dissertation, Institution name]. Database name. DOI',
              B: 'Author, A. (year). Title [Doctoral dissertation]. Institution name. Database name. DOI',
              C: 'Author, A. (year). Title [Doctoral dissertation, Institution name]. Database name.',
              D: 'Author, A. (year). Title. Doctoral dissertation, Institution name. Database name. DOI',
              E: 'None of the above'
            },
            answer: 'None of the above'
          },
          {
            id: 50,
            question:
              'If a paper has an article number in place of a page range, include the word “Article” and then the article number. (T/F)',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'True'
          }
        ]
      },
      {
        id: 6,
        title: 'Appendices',
        score: 0,
        questions: [
          {
            id: 51,
            question:
              'An appendix should help readers better understand, evaluate, replicate the study or argument in the paper. (T/F)',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'True'
          },
          {
            id: 52,
            question: 'An appendix can contain all of the following, except:',
            options: {
              A: 'Tables',
              B: 'Figures',
              C: 'Test',
              D: 'Descriptions of equipment',
              E: 'All of the above',
              F: 'None of the above'
            },
            answer: 'None of the above'
          },
          {
            id: 53,
            question:
              'An appendix occurs after the reference section of a paper. (T/F)',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'True'
          },
          {
            id: 54,
            question:
              'Identify the correct format for the title of a single appendix.',
            options: {
              A: 'Appendix A',
              B: 'Appendix',
              C: 'Appendix 1',
              D: 'Appendix A.',
              E: 'None of the above'
            },
            answer: 'Appendix'
          },
          {
            id: 55,
            question:
              'Identify the correct format for the title of the first of multiple appendices in a paper.',
            options: {
              A: 'Appendix A',
              B: 'Appendix',
              C: 'Appendix 1',
              D: 'Appendix A1',
              E: 'None of the above'
            },
            answer: 'Appendix A'
          },
          {
            id: 56,
            question:
              'You do not provide an in-text citation (e.g., … see Appendix A …) for appendices.',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'False'
          },
          {
            id: 57,
            question:
              'The label for an appendix should appear as a secondary heading under the primary heading, “Appendix”. (T/F)',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'False'
          },
          {
            id: 58,
            question:
              'An appendix is formatted in the same manner as the body of an APA formatted paper. (T/F)',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'True'
          },
          {
            id: 59,
            question:
              'In-text citations are allowed in an appendix and should appear in the reference list. (T/F)',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'True'
          },
          {
            id: 60,
            question:
              'If a paper contains more than one appendix, each new appendix should start a new page. (T/F)',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'True'
          }
        ]
      },
      {
        id: 7,
        title: 'Fonts',
        score: 0,
        questions: [
          {
            id: 61,
            question:
              'Which of the following styles are recommended for use in papers?',
            options: {
              A: 'Arial, size 11',
              B: 'Times New Roma, size 12',
              C: 'Calibri, size 11',
              D: 'All of the above',
              E: 'None of the above'
            },
            answer: 'All of the above'
          },
          {
            id: 62,
            question:
              'Any fancy font is allowed, provided the font is no larger than 12-point. (T/F)',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'False'
          },
          {
            id: 63,
            question: 'Font recommendations are based on:',
            options: {
              A: 'Legibility',
              B: 'Availability',
              C: 'Access to special characters',
              D: 'All of the above',
              E: 'None of the above'
            },
            answer: 'All of the above'
          },
          {
            id: 64,
            question: 'Only one font may be used in a paper. (T/F)',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'False'
          },
          {
            id: 65,
            question:
              'The same font should be used throughout the paper, with the exception of:',
            options: {
              A: 'Running head',
              B: 'Tables',
              C: 'Footnotes',
              D: 'All of the above',
              E: 'None of the above'
            },
            answer: 'Footnotes'
          },
          {
            id: 66,
            question:
              'Underlining may be substituted for italics to distinguish or emphasize words. (T/F)',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'False'
          },
          {
            id: 67,
            question:
              'Different fonts take up different amounts of space on the page. (T/F)',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'True'
          },
          {
            id: 68,
            question:
              'APA allows for both sans serif and serif style fonts. (T/F)',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'True'
          },
          {
            id: 69,
            question:
              'What is the difference between sans serif and serif font styles?',
            options: {
              A: 'Size',
              B: 'Readability',
              C: 'Existence of serifs',
              D: 'All of the above',
              E: 'None of the above'
            },
            answer: 'All of the above'
          },
          {
            id: 70,
            question: 'Identify the sans serif font',
            options: {
              A: 'Times New Roman',
              B: 'Calibri',
              C: 'Georgia',
              D: 'All of the above',
              E: 'None of the above'
            },
            answer: 'Calibri'
          }
        ]
      },
      {
        id: 8,
        title: 'Spacing',
        score: 0,
        questions: [
          {
            id: 71,
            question: 'What spacing should be used throughout the document',
            options: {
              A: 'Double',
              B: 'Single',
              C: '1.5',
              D: 'None of the above as position (e.g., paragraph, quotation, or table) in the paper defines spacing rules'
            },
            answer: 'Double'
          },
          {
            id: 72,
            question: 'Exceptions to double spacing can occur in:',
            options: {
              A: 'Tables',
              B: 'Figures',
              C: 'Equations',
              D: 'All of the above',
              E: 'None of the above'
            },
            answer: 'All of the above'
          },
          {
            id: 73,
            question: 'An extra double space occurs between:',
            options: {
              A: 'Paragraphs',
              B: 'Major sections',
              C: 'Section title and first paragraph',
              D: 'All of the above',
              E: 'None of the above'
            },
            answer: 'None of the above'
          },
          {
            id: 74,
            question:
              'An extra double space is placed between the title and author name on the title page. (T/F)',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'True'
          },
          {
            id: 75,
            question:
              'Double spacing in tables and figures must occur in the following:',
            options: {
              A: 'Titles',
              B: 'Notes',
              C: 'Content',
              D: 'Spacing before and after the table or figure',
              E: 'A and B',
              F: 'C and D'
            },
            answer: 'A and B'
          },
          {
            id: 76,
            question:
              'Authors have the option to include an extra double space before and after tables and figures. (T/F)',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'True'
          },
          {
            id: 77,
            question: 'How many spaces are required at the end of sentences?',
            options: {
              A: 'One space',
              B: 'Two spaces',
              C: 'Three spaces',
              D: 'The answer depends on where the sentence is located in the paper'
            },
            answer: 'One space'
          },
          {
            id: 78,
            question: 'Identify the correct use of spacing for an abbreviation',
            options: {
              A: 'US',
              B: 'U. S.',
              C: 'U.S.',
              D: 'None of the above',
              E: 'All of the above'
            },
            answer: 'U.S.'
          },
          {
            id: 79,
            question: 'Extra spaces should occur before and after en dashes.',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'False'
          },
          {
            id: 80,
            question: 'Identify the correct use of an em dash.',
            options: {
              A: '1-3',
              B: '1 – 3',
              C: 'Formatting involves multiple elements – although multiple elements exist for most activities in life – designed to aid both writers and readers.',
              D: 'Formatting involves multiple elements–although multiple elements exist for most activities in life–designed to aid both writers and readers.'
            },
            answer:
              'Formatting involves multiple elements – although multiple elements exist for most activities in life – designed to aid both writers and readers.'
          }
        ]
      },
      {
        id: 9,
        title: 'Margins',
        score: 0,
        questions: [
          {
            id: 81,
            question: 'Page margins occur on all four sides of a page. (T/F)',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'False'
          },
          {
            id: 82,
            question: 'Wider margins make for wider pages. (T/F)',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'True'
          },
          {
            id: 83,
            question:
              'Page margins should be 1.0 inches on all sides of a page. (T/F)',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'True'
          },
          {
            id: 84,
            question:
              'Paragraphs should be indented 0.5 inch from the page margins. (T/F)',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'False'
          },
          {
            id: 85,
            question:
              'Publishers may not specify different page margins. (T/F)',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'True'
          },
          {
            id: 86,
            question:
              'If printing double-sided, inner page margins can be larger. (T/F)',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: ''
          },
          {
            id: 87,
            question:
              'Identify the default format for page margins in most word processing programs (e.g., WORD).',
            options: {
              A: '0.25 inch',
              B: '0. 50 inch',
              C: '1.0 inch',
              D: '1.25 inch',
              E: 'None of the above'
            },
            answer: '1.0 inch'
          },
          {
            id: 88,
            question: 'In APA, running heads occur within page margins. (T/F)',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'True'
          },
          {
            id: 89,
            question:
              'The default for page margins are different for landscape orientation. (T/F)',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'False'
          },
          {
            id: 90,
            question:
              'Page margins may be changed for pages with only tables or figures. (T/F)',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'False'
          }
        ]
      },
      {
        id: 10,
        title: 'Section Levels',
        score: 0,
        questions: [
          {
            id: 91,
            question: 'Identify the number of section levels in APA.',
            options: {
              A: '3',
              B: '4',
              C: '5',
              D: '6',
              E: 'All of the above',
              F: 'None of the above'
            },
            answer: '5'
          },
          {
            id: 92,
            question: 'Level 1 may be referred to as the Primary level. (T/F)',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'True'
          },
          {
            id: 93,
            question: 'Section levels establish:',
            options: {
              A: 'Focus',
              B: 'Flow',
              C: 'Cohesion',
              D: 'Navigation',
              E: 'All of the above',
              F: 'None of the above'
            },
            answer: 'All of the above'
          },
          {
            id: 94,
            question:
              'The number of levels in a paper does not reflect the complexity of the paper. (T/F)',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'False'
          },
          {
            id: 95,
            question: 'Section levels should avoid which of the following?',
            options: {
              A: 'One subsection within a section level',
              B: 'Numbers or letter in place of statements',
              C: 'Single spacing',
              D: 'Blank lines before and/or after',
              E: 'All of the above',
              F: 'None of the above'
            },
            answer: 'All of the above'
          },
          {
            id: 96,
            question:
              'Because the first paragraphs of a paper are understood to be introductory, the heading “Introduction” is not required.',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'True'
          },
          {
            id: 97,
            question: 'The only level 1 heading in a paper is the title.',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'False'
          },
          {
            id: 98,
            question:
              'Major sections (e.g., Methods, Results, Discussion) of papers are considered to be level 2 headings.',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'False'
          },
          {
            id: 99,
            question: 'A paper title acts as a de facto level 1 heading.',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'True'
          },
          {
            id: 100,
            question:
              'Section levels can be used to identify which of the following?',
            options: {
              A: 'Hierarchies',
              B: 'Categories',
              C: 'Elements within a model',
              D: 'Contrasting opinions',
              E: 'All of the above'
            },
            answer: 'All of the above'
          }
        ]
      },
      {
        id: 11,
        title: 'Level Formatting',
        score: 0,
        questions: [
          {
            id: 101,
            question:
              'All level headings, except for the Reference, are bolded.',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'False'
          },
          {
            id: 102,
            question:
              'All level headings are written in title case capitalization.',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'True'
          },
          {
            id: 103,
            question:
              'The use of italics differentiates between which level headings',
            options: {
              A: 'Level 1 and level 2',
              B: 'Level 2 and level 3',
              C: 'Level 3 and level 4',
              D: 'Level 4 and level 5',
              E: 'A and B',
              F: 'B and C',
              G: 'B and D'
            },
            answer: 'B and D'
          },
          {
            id: 104,
            question:
              'Begin the first paragraph flush left after a level 1 or 2 heading.',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'False'
          },
          {
            id: 105,
            question:
              'When using level 4 or 5 headings, begin paragraph text on the same line as the section level.',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'True'
          },
          {
            id: 106,
            question: 'Identify the correct format for level 1 headings',
            options: {
              A: 'Centered, bolded, all upper case lettering',
              B: 'Centered, not bolded, title case capitalization',
              C: 'Centered, bolded, title case capitalization',
              D: 'Centered, bolded, sentence case capitalization'
            },
            answer: 'Centered, bolded, title case capitalization'
          },
          {
            id: 107,
            question: 'Identify the correctly formatted level 2 heading',
            options: {
              A: 'The importance of formatting',
              B: '<strong>The Importance of Formatting</strong>',
              C: '<strong><em>The Importance of Formatting</em></strong>',
              D: '<strong>The importance of formatting</strong>'
            },
            answer: '<strong>The Importance of Formatting</strong>'
          },
          {
            id: 108,
            question: 'Identify the correct format for level 3 headings',
            options: {
              A: 'Left-aligned, bolded, all upper case lettering, text begins on new line',
              B: 'Left-aligned, bolded, italicized, title case capitalization, text begins on new line',
              C: 'Left-aligned, bolded, italicized, sentence case capitalization, text begins on new line',
              D: 'Left-aligned, bolded, sentence case capitalization, text begins in new line'
            },
            answer:
              'Left-aligned, bolded, italicized, title case capitalization, text begins on new line'
          },
          {
            id: 109,
            question: 'Identify the correctly formatted level 4 heading',
            options: {
              A: '[Indented] <strong><em>The importance of formatting</em></strong> Text begins on new line',
              B: '[Indented] <strong><em>The Importance of Formatting.</em></strong> Text begins on same line',
              C: '[Indented] <strong>The Importance of Formatting.</strong> Text begins on same line',
              D: '[Indented] <strong>The importance of formatting.</strong> Text begins on same line'
            },
            answer:
              '[Indented] <strong>The Importance of Formatting.</strong> Text begins on same line'
          },
          {
            id: 110,
            question: 'Identify the correct format for level 5 headings',
            options: {
              A: 'Indented, bolded, all upper case lettering, text begins on next line',
              B: 'Indented, not bolded, title case capitalization, text begins on same line',
              C: 'Indented, bolded, italicized, title case capitalization, text begins on same line',
              D: 'Indented, bolded, italicized, title case capitalization, text begins on same line'
            },
            answer:
              'Indented, bolded, italicized, title case capitalization, text begins on same line'
          }
        ]
      },
      {
        id: 12,
        title: 'Tables',
        score: 0,
        questions: [
          {
            id: 111,
            question: 'Tables may appear before being mentioned in the text.',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'False'
          },
          {
            id: 112,
            question: 'Identify the correct format for a table title:',
            options: {
              A: '<strong>Descriptive statistics for sample</strong>',
              B: '<em>Descriptive statistics for sample</em>',
              C: '<strong><em>Descriptive Statistics for Sample</em></strong>',
              D: '<strong>Descriptive Statistics for Sample</strong>',
              E: 'None of the above'
            },
            answer: 'None of the above'
          },
          {
            id: 113,
            question:
              'Column headings are written in title case capitalization.',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'False'
          },
          {
            id: 114,
            question: 'The stub heading occurs within the leftmost column.',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'True'
          },
          {
            id: 115,
            question:
              'A cell is the point of intersection between a row and column in a table.',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'True'
          },
          {
            id: 116,
            question: 'Center data on decimals in each cell.',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'True'
          },
          {
            id: 117,
            question: 'You may left-align text data to improve readability.',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'True'
          },
          {
            id: 118,
            question:
              'Identify the three types of notes appearing below a table in the proper order.',
            options: {
              A: 'Specific, general, non-probability',
              B: 'General, specific, probability',
              C: 'Probability, specific, general',
              D: 'Specific, general, probability',
              E: 'None of the above'
            },
            answer: 'General, specific, probability'
          },
          {
            id: 119,
            question: 'In tables, spanners are used to:',
            options: {
              A: 'Identify entries in one column',
              B: 'Explain or clarify information in notes',
              C: 'Identify probability values in notes',
              D: 'Describe two or more columns in the table body',
              E: 'None of the above'
            },
            answer: 'Describe two or more columns in the table body'
          },
          {
            id: 120,
            question: 'In APA, tables may not possess vertical lines.',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'True'
          },
          {
            id: 121,
            question:
              'If a table is longer than one page, you do not repeat the heading row on the second page.',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'False'
          },
          {
            id: 122,
            question: 'Tables should be placed at the top or bottom of a page.',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'True'
          },
          {
            id: 123,
            question:
              'A blank double spaced line is placed between a table and any text to improve readability.',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'True'
          }
        ]
      },
      {
        id: 13,
        title: 'Figures',
        score: 0,
        questions: [
          {
            id: 124,
            question:
              'Aside from tables, all visual displays in APA are referred to as figures.',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'True'
          },
          {
            id: 125,
            question: 'Tables and figures share the same overall setup.',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'True'
          },
          {
            id: 126,
            question: 'A figure number is bolded.',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'True'
          },
          {
            id: 127,
            question: 'Identify the correct format for a figure title:',
            options: {
              A: '<strong><em>Changes in graduate student performance as a function of time</em></strong>',
              B: '<em>Changes in graduate student performance as a function of time</em>',
              C: '<strong><em>Changes in Graduate Student Performance as a Function of Time</em></strong>',
              D: '<em>Changes in Graduate Student Performance as a Function of Time</em>',
              E: 'None of the above'
            },
            answer:
              '<em>Changes in Graduate Student Performance as a Function of Time</em>'
          },
          {
            id: 128,
            question:
              'Identify the three types of notes appearing below a table in the proper order.',
            options: {
              A: 'Specific, general, non-probability',
              B: 'General, specific, probability',
              C: 'Probability, specific, general',
              D: 'Specific, general, probability',
              E: 'None of the above'
            },
            answer: 'General, specific, probability'
          },
          {
            id: 129,
            question: 'Figures can take the form of:',
            options: {
              A: 'Charts',
              B: 'Drawings',
              C: 'Graphs',
              D: 'Maps',
              E: 'All of the above',
              F: 'None of the above'
            },
            answer: 'All of the above'
          },
          {
            id: 130,
            question: 'An embedded figure may take up an entire page.',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'True'
          },
          {
            id: 131,
            question: 'Figure legends are written in sentence case.',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'False'
          },
          {
            id: 132,
            question:
              'Text in a figure should use the following font size range:',
            options: {
              A: '8-14 point',
              B: '9-12 point',
              C: '10-16 point',
              D: '12 point only',
              E: 'Any of the above',
              F: 'None of the above'
            },
            answer: '8-14 point'
          },
          {
            id: 133,
            question:
              'Figures should run from the left to right page margins with 0.5 inch indent.',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'False'
          }
        ]
      },
      {
        id: 14,
        title: 'In-text Citations',
        score: 0,
        questions: [
          {
            id: 134,
            question: 'An in-text citation can occur at:',
            options: {
              A: 'The end of a sentence',
              B: 'After an in-text quotation',
              C: 'After an in-text identification of the source’s author',
              D: 'All of the above',
              E: 'None of the above'
            },
            answer: 'All of the above'
          },
          {
            id: 135,
            question: 'Select the correct usage of in-text citation.',
            options: {
              A: '(John Smith and Jane Johnson)',
              B: '(Smith and Johnson)',
              C: '(Smith and Johnson, 2022)',
              D: '(Smith & Johnson, 2022)',
              E: 'A or B',
              F: 'C or D'
            },
            answer: '(Smith & Johnson, 2022)'
          },
          {
            id: 136,
            question: 'Select the correct usage of in-text citation.',
            options: {
              A: 'Smith and Johnson provide examples of …',
              B: 'John Smith and Jane Johnson (2022) provide examples of …',
              C: 'Smith and Johnson (2022) provide examples of …',
              D: 'Smith & Johnson (2022) provide examples of …'
            },
            answer: 'Smith and Johnson (2022) provide examples of …'
          },
          {
            id: 137,
            question:
              'In-text citations only refer to the sources in the Reference section.',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'False'
          },
          {
            id: 138,
            question:
              'You do not provide an in-text citation for sources having no author.',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'False'
          },
          {
            id: 139,
            question:
              'The abbreviation, et al., should not be used within in-text citation.',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'False'
          },
          {
            id: 140,
            question:
              'In-text citations for authors with hyphenated surnames include both names.',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'True'
          },
          {
            id: 141,
            question:
              'Multiple in-text citations within the same parenthetical are separated by a:',
            options: {
              A: 'Comma',
              B: 'Semi-colon',
              C: 'Colon',
              D: 'All of the above',
              E: 'None of the above'
            },
            answer: 'Semi-colon'
          },
          {
            id: 142,
            question:
              'Multiple in-text citations within the same parenthetical are ordered by:',
            options: {
              A: 'Order of use in the sentence',
              B: 'Alphabetical order found in the Reference section',
              C: 'Chronological order of publication for citations in the parenthetical',
              D: 'All of the above',
              E: 'None of the above'
            },
            answer: 'Alphabetical order found in the Reference section'
          },
          {
            id: 143,
            question: 'In-text citations of personal communications are:',
            options: {
              A: 'Not made',
              B: 'Not included in the References section',
              C: 'Identified with the initials of the person(s) in communication and the exact date(s) of communication',
              D: 'A only',
              E: 'B and C'
            },
            answer: 'In-text citations of personal communications are:'
          }
        ]
      },
      {
        id: 15,
        title: 'Quotations',
        score: 0,
        questions: [
          {
            id: 144,
            question:
              'An in-text citation for a short quotation (i.e., less than 40 words) includes:',
            options: {
              A: 'Author last name, publication year, and page number (preceded by p.)',
              B: 'Author last name, publication year, and page number (not preceded by p.)',
              C: 'Author last name, publication year',
              D: 'Author last name, page number (preceded by p.)'
            },
            answer:
              'Author last name, publication year, and page number (preceded by p.)'
          },
          {
            id: 145,
            question: 'A block quotation (i.e., more than 40 words) should be:',
            options: {
              A: 'Single-spaced, indented half an inch',
              B: 'Double-spaced, indented half an inch',
              C: 'Double-spaced, indented half an inch, enclosed within quotation marks',
              D: 'Enclosed within double quotation marks'
            },
            answer: 'Double-spaced, indented half an inch'
          },
          {
            id: 146,
            question:
              'Quotations should be used when the author says something:',
            options: {
              A: 'Memorable',
              B: 'Succinctly',
              C: 'You want to respond to directly',
              D: 'All of the above',
              E: 'None of the above'
            },
            answer: 'All of the above'
          },
          {
            id: 147,
            question: 'Ellipsis should begin and end all short quotations.',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'False'
          },
          {
            id: 148,
            question:
              'Identify the correct in-text citation for a short quotation.',
            options: {
              A: 'Effective formatting “begins in the first year of graduate school (Smith, 2022, p. 21).”',
              B: 'Effective formatting “begins in the first year of graduate school.” (Smith, 2022)',
              C: 'Effective formatting “begins in the first year of graduate school” (Smith, 2022, p. 21).',
              D: 'Effective formatting “begins in the first year of graduate school” (Smith, 2022).'
            },
            answer:
              'Effective formatting “begins in the first year of graduate school” (Smith, 2022, p. 21).'
          },
          {
            id: 149,
            question:
              'If you cite the author and year in the narrative of your sentence, the page number for a short quotation should appear outside the closing quotation mark.',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'False'
          },
          {
            id: 150,
            question:
              'The in-text citation for a short quotation in the body of a sentence can be placed directly after the quotation or at the end of the sentence.',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'True'
          },
          {
            id: 151,
            question: 'Block quotations can include multiple paragraphs.',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'True'
          },
          {
            id: 152,
            question:
              'An extra double space should appear before and after a block quotation.',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'False'
          },
          {
            id: 153,
            question: 'The in-text citation for a block quotation can occur:',
            options: {
              A: 'In the narrative before the quotation',
              B: 'In parenthetical after the final punctuation of the quotation',
              C: 'With the name and author in the narrative before the quotation and the page number in parenthetical after the final punctuation of the quotation.',
              D: 'All of the above',
              E: 'None of the above'
            },
            answer: 'All of the above'
          }
        ]
      },
      {
        id: 16,
        title: 'General Questions',
        score: 0,
        questions: [
          {
            id: 154,
            question:
              'Each source in the References section must have a corresponding in-text citation.',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'True'
          },
          {
            id: 155,
            question:
              'Personal communications should be referenced in the Reference section.',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'False'
          },
          {
            id: 156,
            question:
              'The Reference section is the only section title not bolded.',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'False'
          },
          {
            id: 157,
            question: 'Hyperlinks have to be included with the DOI.',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'True'
          },
          {
            id: 158,
            question:
              'What terms can be used to label the references section at the end of a paper?',
            options: {
              A: 'Works Cited',
              B: 'Bibliography',
              C: 'References',
              D: 'None of the above',
              E: 'A, B, or C'
            },
            answer: 'References'
          },
          {
            id: 159,
            question:
              'Select the correct reference example for a journal article.',
            options: {
              A: 'Smith, John and Johnson, Jane. (2022). Why should I learn APA. Journal of Being a Graduate Student, 50(1), 100-112.',
              B: 'Smith, J., & Johnson, J. (2022). Why Should I Learn APA. Journal of Being a Graduate Student, 50(1), 100-112.',
              C: 'Smith, J., Johnson, J. (2022). Why should I learn APA. Journal of Being a Graduate Student, 50(1), 100-112.',
              D: 'Smith, J., & Johnson, J. (2022). Why should I learn APA. Journal of Being a Graduate Student, 50(1), 100-112.',
              E: 'None of the above'
            },
            answer:
              'Smith, J., & Johnson, J. (2022). Why should I learn APA. Journal of Being a Graduate Student, 50(1), 100-112.'
          },
          {
            id: 160,
            question: 'Select the correct reference example for a book.',
            options: {
              A: 'Smith, J. (2022). The Purpose Behind APA. Johnson Publishing. College Town, TX.',
              B: 'Smith, J. (2022). The purpose behind APA. Johnson Publishing. College Town, TX.',
              C: 'Smith, J. (2022). The purpose behind APA. Johnson Publishing.',
              D: 'Smith, J. (2022). The purpose behind APA. Johnson Publishing. https://gradcapfinder.com/',
              E: 'A or B',
              F: 'C or D',
              G: 'None of the above'
            },
            answer: 'C or D'
          },
          {
            id: 161,
            question: 'References should be in order of:',
            options: {
              A: 'Chronology by date of publication',
              B: 'Alphabetical by first author’s last name',
              C: 'Alphabetical by title',
              D: 'Chronology by use in the paper',
              E: 'None of the above'
            },
            answer: 'Alphabetical by first author’s last name'
          },
          {
            id: 162,
            question:
              'All lines after the first line of each reference entry should be indented an additional 1.0 inch from the left margin.',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'False'
          },
          {
            id: 163,
            question:
              'The Reference section appears after all other sections within a paper.',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'False'
          }
        ]
      },
      {
        id: 17,
        title: 'Author',
        score: 0,
        questions: [
          {
            id: 164,
            question:
              'The use of et al., is proscribed in author lists for a reference.',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'True'
          },
          {
            id: 165,
            question:
              'If a paper has more than 3 authors, you should include an ellipsis after the third author and then the final name.',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'False'
          },
          {
            id: 166,
            question:
              'Identify the correct reference format for the author name, Samuel-Solomon Pytor Bogavich-Amin',
            options: {
              A: 'Amin, S. P.',
              B: 'Bogavich-Amin, S-S. P.',
              C: 'B.-Amin, S.-S. P.',
              D: 'Bogavich-Amin, S.-S. P.',
              E: 'None of the above'
            },
            answer: 'Bogavich-Amin, S.-S. P.'
          },
          {
            id: 167,
            question:
              'Identify the correct reference format for the editor of a book',
            options: {
              A: 'In J. Smith (Ed.)',
              B: 'In Smith, J (Ed.)',
              C: 'In John Smith (ed.)',
              D: 'In John Smith (Ed.)',
              E: 'None of the above'
            },
            answer: 'In J. Smith (Ed.)'
          },
          {
            id: 168,
            question:
              'An ampersand should be used in place of the word “and” in a list of multiple editors.',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'True'
          },
          {
            id: 169,
            question:
              'The author for a government report should include the individual authors and government agency.',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'False'
          },
          {
            id: 170,
            question:
              'Identify the correct reference format for a government agency name.',
            options: {
              A: 'National intelligence agency',
              B: 'National Intelligence Agency',
              C: 'NIA',
              D: 'Agency, N. I.',
              E: 'None of the above'
            },
            answer: 'National Intelligence Agency'
          },
          {
            id: 171,
            question:
              'The name in a reference for a blog should be written as the name appears in the blog.',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'True'
          },
          {
            id: 172,
            question:
              'The chair of a dissertation committee should be identified as an editor in a dissertation reference.',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'False'
          },
          {
            id: 173,
            question:
              'What number of authors is required for using an ellipsis in the name section of a reference?',
            options: {
              A: '3',
              B: '7',
              C: '19',
              D: '21',
              E: 'None of the above'
            },
            answer: '21'
          }
        ]
      },
      {
        id: 18,
        title: 'Date',
        score: 0,
        questions: [
          {
            id: 174,
            question:
              'Which of the following should you use in reference if you do not know the date of publication?',
            options: {
              A: '(No date)',
              B: '(N. D.)',
              C: '(N. d.)',
              D: '(n.d.)',
              E: 'None of the above'
            },
            answer: '(n.d.)'
          },
          {
            id: 175,
            question:
              'Which of the following should you use to identify the date of conference presentations?',
            options: {
              A: 'Do not identify the date of the conference in the Date section of a reference',
              B: '(Date of conference with month first, Year of conference)',
              C: '(Year of conference, Date of conference with month first and range of dates for conference)',
              D: '(Year of conference, Date of conference with month first and date of presentation)',
              E: 'None of the above'
            },
            answer:
              '(Year of conference, Date of conference with month first and range of dates for conference)'
          },
          {
            id: 176,
            question:
              'Identify the correct format for the date of a published dissertation.',
            options: {
              A: '(Fall, 2022)',
              B: '(2023, Spring)',
              C: '(2022-2023)',
              D: '(2023)',
              E: 'None of the above'
            },
            answer: '(2023)'
          },
          {
            id: 177,
            question:
              'The correct format for the date of an online dictionary is (n.d.).',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'True'
          },
          {
            id: 178,
            question:
              'The correct format for the date of an online blog is (n.d.).',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'False'
          },
          {
            id: 179,
            question:
              'Identify the correct format for retrieval date for an online publication',
            options: {
              A: 'Retrieved 01/01/2023, from ...',
              B: 'Retrieved on January 1st, 2023, from ...',
              C: 'Retrieved January 1, 2023, from ...',
              D: 'Retrieved from … on January 1, 2023.'
            },
            answer: 'Retrieved January 1, 2023, from ...'
          },
          {
            id: 180,
            question:
              'A reference for a paper retraction includes both the year of the retraction and the year of publication for the original paper.',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'False'
          },
          {
            id: 181,
            question:
              'For most standards, the date will be the year the standard was made effective.',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'True'
          },
          {
            id: 182,
            question:
              'Identify the correct format for the date of a conference proceedings.',
            options: {
              A: '(2022)',
              B: '(2022, Spring Meeting)',
              C: '(2022, April 1)',
              D: '(April 1, 2022)',
              E: 'None of the above'
            },
            answer: '(2022)'
          },
          {
            id: 183,
            question:
              'Identify the correct format for the date of an article in press',
            options: {
              A: '(Year of submission)',
              B: '(Current year)',
              C: '(Month day, year of submission)',
              D: '(Year of submission, Month day)',
              E: 'None of the above'
            },
            answer: 'None of the above'
          }
        ]
      },
      {
        id: 19,
        title: 'General Title',
        score: 0,
        questions: [
          {
            id: 184,
            question: 'The title in a reference should always be italicized.',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'False'
          },
          {
            id: 185,
            question:
              'The title in a reference is written in sentence case capitalization.',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'True'
          },
          {
            id: 186,
            question: 'Identify the correct format for the title of a book.',
            options: {
              A: 'Graduate School is a Marathon.',
              B: '<em>Graduate school is a marathon.</em>',
              C: '<strong>Graduate School is a Marathon.</strong>',
              D: 'Graduate school is a marathon.',
              E: 'None of the above'
            },
            answer: 'Graduate school is a marathon.'
          },
          {
            id: 187,
            question: 'Do not reference a source without a title.',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'False'
          },
          {
            id: 188,
            question: 'Identify the correct format for the title of an app.',
            options: {
              A: '<em>Quester</em>, app.',
              B: '<em>Quester, [app].</em>',
              C: '<em>Quester</em>, [app].',
              D: 'Quester, (app).',
              E: 'None of the above'
            },
            answer: '<em>Quester</em>, [app].'
          },
          {
            id: 189,
            question:
              'Do not identify the edition of a book in the title section of a reference.',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'False'
          },
          {
            id: 190,
            question:
              'Identify the correct format for the title of a book ending with a question mark',
            options: {
              A: '<em>So you want to be a PhD?.</em>',
              B: 'So you want to be a PhD?',
              C: 'So you want to be a PhD?.',
              D: '<em>So you want to be a PhD?</em>',
              E: 'None of the above'
            },
            answer: '<em>So you want to be a PhD?</em>'
          },
          {
            id: 191,
            question: 'Replace an em dash with a colon in the title.',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'False'
          },
          {
            id: 192,
            question:
              'Identify the correct format for a book chapter within a book.',
            options: {
              A: 'Before you get started on your marathon.',
              B: '<em>Before you Get Started on Your Marathon.</em>',
              C: '<em>Before you get started on your marathon.</em>',
              D: 'Before you Get Started on Your Marathon.',
              E: 'None of the above'
            },
            answer: 'Before you get started on your marathon.'
          },
          {
            id: 193,
            question:
              'Proper nouns are capitalized in the title of a reference.',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'True'
          }
        ]
      },
      {
        id: 20,
        title: 'Source',
        score: 0,
        questions: [
          {
            id: 194,
            question:
              'The source of a reference assists readers in retrieving original information.',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'True'
          },
          {
            id: 195,
            question: 'The source of a book includes the publisher’s location.',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'False'
          },
          {
            id: 196,
            question:
              'The source for a journal article must include the issue number.',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'False'
          },
          {
            id: 197,
            question: 'Do not abbreviate the title of a journal.',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'True'
          },
          {
            id: 198,
            question:
              'Identify the correct format for the source of an article:',
            options: {
              A: 'Journal Title, Vol(Issue). DOI.',
              B: '<em>Journal Title, Vol</em>(Issue). DOI.',
              C: '<em>Journal title, Vol</em>(Issue). DOI',
              D: '<em>Journal Title, Vol</em>(Issue). DOI',
              E: 'None of the above'
            },
            answer: '<em>Journal Title, Vol</em>(Issue). DOI'
          },
          {
            id: 199,
            question: 'Include the retrieval date for all website sources.',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'False'
          },
          {
            id: 200,
            question: 'An internet source typically includes the URL.',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'True'
          },
          {
            id: 201,
            question: 'Do not use a URL shortener to abbreviate a long URL',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'False'
          },
          {
            id: 202,
            question:
              'Identify the correct format for the source of a website:',
            options: {
              A: '<a>https://apastyle.apa.org/</a>',
              B: '<em>https://apastyle.apa.org/</em>',
              C: '<em><a>https://apastyle.apa.org/</a></em>',
              D: 'https://apastyle.apa.org/.',
              E: 'None of the above'
            },
            answer: 'https://apastyle.apa.org/'
          },
          {
            id: 203,
            question:
              'When no source information is available, no reference should be made in the reference list.',
            options: {
              A: 'True',
              B: 'False'
            },
            answer: 'True'
          }
        ]
      }
    ]
  }
];

export default quizzes;

// {
//   title: 'Tables',
//   questions: [
//     {
//       question: '',
//       options: {
//         A: 'True',
//         B: 'False',
//       },
//       answer: '',
//     },
//     {
//       question: '',
//       options: {
//         A: '',
//         B: '',
//         C: '',
//         D: '',
//         E: '',
//         F: '',
//         G: '',
//       },
//       answer: '',
//     },
//   ],
// },
