module.exports = {
    openAiKey: "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",//process.env.OPENAI_API_KEY,
    prompt: `Multi
    ##EXAMPLE
    CODE:
    def apply_input_to_func(func, input):
        func(input)

    def main():
        my_data = []
        their_data = []
        for i in range(10):
            apply_input_to_func(my_data.add,i)
            their_data.add(i)
            j = 1/0
        print(my_data)

    main()


    ERROR:
    Traceback (most recent call last):
      File "broken.py", line 15, in <module>
        main()
      File "broken.py", line 9, in main
        apply_input_to_func(my_data.add, i)
    AttributeError: 'list' object has no attribute 'add'

    SOLUTION:
    Old code:
    line 9: apply_input_to_func(my_data.add, i)
    line 10: their_data.add(i)
    New code:
    line 9: apply_input_to_func(my_data.append, i)
    line 10: their_data.append(i)
    line 11: # j = 1/0


    Use this format to find a solution:
    CODE:
    {code which needs to be fixed}

    ERROR:
    {error message resulting from the code}

    SOLUTION:
    Old code:
    {line number(s) and old code}
    New code:
    {line number(s) and new code}

    Now fix this.`,
    kCode: "CODE:",
    kError: "ERROR:",
    kSOLUTION: "SOLUTION:",
    //promptAfterDiff: 'Generate 1 to 3 paragraphs to explain this diff to a human without mentioning changes themselves:',

    completionPromptParams: {
        model: "text-davinci-002",
        max_tokens: 500,
        temperature: 0.2,
        top_p: 1,
        presence_penalty: 0,
        frequency_penalty: 0,
        best_of: 1,
        n: 1,
        stream: false,
        // stop: ["\n\n\n"],
    }
}
