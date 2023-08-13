<template>
  <div
    class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-lg"
  >
    <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
      <div
        v-if="!isFinish"
        class="text-green-500 bg-gray-50 px-4 py-1 mb-4 sm:flex sm:px-6 flex align-middle justify-center"
      >
        {{ displayTimer }}
      </div>

      <div class="sm:flex sm:items-start">
        <div class="flex h-full w-full flex-col align-middle">
          <div
            class="flex h-full w-full align-middle justify-center bg-white py-6 px-4 shadow-xl questions"
          >
            <span class="text-center" v-if="!isStarted && !isFinish">
              Až budete připraveni, klikněte na tlačítko "Start".
              <br />
              Počet otázek v kvízu: <b>{{ quiz.questions.length }}</b>
            </span>

            <span v-else-if="questions.length && !isFinish" class="text-center">
              {{ questions[currentQuastionIndex].quation }}
            </span>

            <div v-else-if="isFinish && savedData" class="">
              <span
                v-if="isSaved"
                class="text-center text-xl text-green-500 pb-4 inline-block"
                >Gratulujeme! Vaš výsledek byl uložen.</span
              >
              <div class="grid grid-cols-2 gap-4">
                <div>Úspěšnost:</div>
                <div>{{ `${savedData.score}%` }}</div>
                <div>Bylo otázek:</div>
                <div>{{ savedData.quationsCount }}</div>
                <div>Správné odpovědi:</div>
                <div>{{ savedData.rightAnswersCount }}</div>
                <div>Nesprávné odpovědi:</div>
                <div>
                  {{ savedData.quationsCount - savedData.rightAnswersCount }}
                </div>
                <div>Délka trvání práce:</div>
                <div>{{ padWithLeadingZeros(savedData.seconds) }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="isFinish"
      class="flex flex-col bg-gray-50 px-4 py-3 sm:flex sm:px-6 flex align-middle justify-center"
    >
      <button
        class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        @click="reset"
      >
        <img
          class="inline-block w-6 h-6 mr-2 mb-1"
          src="https://cdn-icons-png.flaticon.com/128/9053/9053462.png"
        />
        Opakovat tento kvíz
      </button>
    </div>

    <div
      v-if="isStarted && !isFinish"
      class="flex flex-col bg-gray-50 px-4 py-3 sm:flex sm:px-6 flex align-middle justify-center"
    >
      <div class="flex align-middle justify-center pb-4">
        <span>{{ `${currentQuastionIndex + 1}/${quiz.questions.length}` }}</span>
      </div>
      <div class="grid gap-2 grid-cols-2">
        <div
          class="answers"
          v-for="(a, indx) in questions[currentQuastionIndex].answers"
          :key="indx"
        >
          <input
            type="radio"
            name="answer"
            class="hidden"
            :id="`radio_${indx}`"
            v-model="picked"
            :value="indx"
          />
          <label
            :for="`radio_${indx}`"
            class="flex flex-col items-center p-4 border-2 border-gray-400 cursor-pointer"
          >
            {{ a.text }}
          </label>
        </div>
      </div>
    </div>

    <div
      class="bg-gray-50 px-4 py-3 sm:flex sm:px-6 flex align-middle justify-center"
    >
      <button
        class="text-gray-500 hover:text-gray-900 font-bold py-2 px-10 rounded"
        @click="$emit('close')"
      >
        Zrušit
      </button>

      <button
        v-if="!isStarted && !isFinish"
        class="text-white font-bold py-2 px-10 rounded"
        :class="{
          'bg-green-100 cursor-not-allowed hover:bg-green-100': isStarted,
          'bg-green-500 hover:bg-green-900': !isStarted,
        }"
        :disabled="isStarted"
        @click="start"
      >
        Start
      </button>

      <button
        class="text-white font-bold py-2 px-10 rounded"
        v-else-if="!isFinish"
        :class="{
          'bg-green-100 cursor-not-allowed hover:bg-green-100':
            !picked && picked !== 0,
          'bg-green-500 hover:bg-green-900': picked || picked === 0,
        }"
        @click="handleNextQuation"
        :disabled="!picked && picked !== 0"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Questions",
  props: {
    quiz: {
      type: Object,
      default: null,
    },
    score: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      savedData: null,
      timer: null,
      seconds: 0,
      displayTimer: "00:00",
      isStarted: false,
      isFinish: false,
      isSaved: false,
      result: [],
      picked: null,
      questions: this.$props?.quiz?.questions
        ? this.shuffleArray(this.$props.quiz.questions)
        : [],
      currentQuastionIndex: 0,
    };
  },
  async created() {
    if (this.score) {
      this.isStarted = true;
      this.isFinish = true;
      this.savedData = this.score;
    }
  },
  methods: {
    shuffleArray(array) {
      let result = array;
      for (let i = result.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
      }
      return result;
    },
    reset() {
      this.savedData = null;
      this.timer = null;
      this.seconds = 0;
      this.displayTimer = "00:00";
      this.isStarted = false;
      this.isFinish = false;
      this.isSaved = false;
      this.result = [];
      this.picked = null;
      this.questions = this.$props?.quiz?.questions
        ? this.shuffleArray(this.$props.quiz.questions)
        : [];
      this.currentQuastionIndex = 0;
    },
    finish() {
      this.stop();
      this.isFinish = true;
      this.isSaved = true;

      const rightAnswersCount = this.result.filter((r) => r.isCorrect).length;

      const data = {
        quizId: this.$props.quiz.id,
        name: this.$props.quiz.name,
        quationsCount: this.result.length,
        rightAnswersCount,
        score: Math.round((rightAnswersCount * 100) / this.result.length),
        seconds: this.seconds,
      };

      this.savedData = data;

      this.$emit("saveToLocalStorage", data);
    },
    handleNextQuation() {
      const currentAnswers = this.questions[this.currentQuastionIndex].answers;
      const newResultItem = {
        id: this.picked,
        isCorrect: currentAnswers[this.picked].isCorrect,
      };

      this.result = [...this.result, newResultItem];
      this.currentQuastionIndex = this.currentQuastionIndex + 1;
      this.picked = null;

      if (this.currentQuastionIndex === this.questions.length) {
        this.finish();
      }
    },
    padWithLeadingZeros(dataSeconds) {
      let result = "";

      let hours = Math.floor(dataSeconds / 3600);
      let minutes = Math.floor((dataSeconds - hours * 3600) / 60);
      let seconds = dataSeconds - hours * 3600 - minutes * 60;

      if (hours) result += String(hours).padStart(2, "0") + ":";
      result += String(minutes).padStart(2, "0") + ":";
      result += String(seconds).padStart(2, "0");

      return result;
    },
    start() {
      this.timer = setInterval(() => {
        ++this.seconds;
        this.displayTimer = this.padWithLeadingZeros(this.seconds);
      }, 1000);

      (this.questions = this.$props?.quiz?.questions
        ? this.shuffleArray(this.$props.quiz.questions)
        : []),
        (this.isStarted = true);
    },
    stop() {
      clearInterval(this.timer);
    },
  },
};
</script>

<style scoped>
.answers input:checked + label {
  border-color: burlywood;
  background-color: antiquewhite;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
}
.questions {
  /* width: 100%; */
  border: 1px dashed gray;
  border-radius: 10px;
}
</style>
