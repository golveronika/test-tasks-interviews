<template>
  <div class="quiz-wrapper">
    <header-quiz
      :activePage="activePage"
      :pages="pages"
      @handle-page-change="handlePageChange"
    ></header-quiz>

    <template v-if="activePage === 'quizes'">
      <div class="bg-gray-100" v-if="quizes">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            class="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:pb-32 lg:pt-16"
          >
            <h2 class="text-2xl font-bold text-gray-900">
              Vyzkoušejte své znalosti:
            </h2>
            <div
              class="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0"
            >
              <div
                v-for="quiz in quizes"
                :key="quiz.id"
                class="group relative quize-preview"
                @click="handleOpenQuiz(quiz.id)"
              >
                <div
                  class="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64"
                >
                  <img
                    :src="quiz.image"
                    class="h-full w-full object-cover object-center"
                  />
                </div>
                <div class="flex justify-between items-center">
                  <p class="text-base font-semibold text-gray-900 pt-3">
                    {{ quiz.name }}
                  </p>
                  <p class="text-base font-semibold text-lime-500 pt-3">
                    {{ quizScore(quiz.id) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
        v-if="isModalOpen && selectedQuiz"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        ></div>
        <div
          class="fixed inset-0 z-10 overflow-y-auto flex items-center justify-center align-middle"
        >
          <div
            class="flex align-middle justify-center lg:h-full sm:h-auto p-4 text-center sm:items-center sm:p-0 w-full"
          >
            <questions
              :quiz="selectedQuiz"
              :score="selectedQuizScore"
              @close="handleQuizClose"
              @saveToLocalStorage="saveToLocalStorage"
            />
          </div>
        </div>
      </div>
    </template>
    <template v-else-if="activePage === 'records'">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          class="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:pb-32 lg:pt-16"
        >
          <h2 class="text-2xl font-bold text-gray-900">Top 5 záznamů</h2>

          <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
            <table v-if="storageScore" class="w-full text-sm text-left">
              <thead
                class="text-xs text-white uppercase bg-blue-600 border-b border-blue-400 text-white"
              >
                <tr>
                  <th scope="col" class="px-6 py-3 bg-blue-500">Název kvízu</th>
                  <th scope="col" class="px-6 py-3">Score</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  class="bg-neutral-100 border-b border-blue-400"
                  v-for="quizScore in storageScore.slice(0, 5)"
                  :key="quizScore.quizId"
                >
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium bg-neutral-100 text-neutral-950 whitespace-nowrap"
                  >
                    {{ quizScore.name }}
                  </th>
                  <td class="px-6 py-4 bg-neutral-200">
                    {{ `${quizScore.score}%` }}
                  </td>
                </tr>
              </tbody>
            </table>
            <span
              class="flex h-full w-full align-middle justify-center p-10 bg-neutral-100"
              v-else
            >
              Zatím nemáte žádné výsledky kvízu. Hodně štěstí!</span
            >
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import HeaderQuiz from "./../components/Quiz/HeaderQuiz.vue";
import Questions from "./../components/Quiz/Questions.vue";
import getQuizes from "./../services/getQuizes";

export default {
  name: "Quiz",
  components: {
    HeaderQuiz,
    Questions,
  },
  data() {
    return {
      activePage: "quizes",
      pages: [
        {
          label: "Kvízy",
          id: "quizes",
        },
        {
          label: "Moje záznamy",
          id: "records",
        },
      ],
      isModalOpen: false,
      selectedQuiz: null,
      selectedQuizScore: null,
      quizes: null,
      storageScore: null,
    };
  },
  async created() {
    const quizes = await getQuizes();
    this.quizes = quizes;
    let dataStorage = window.localStorage.getItem("quizScore");
    if (dataStorage) {
      this.storageScore = JSON.parse(dataStorage).data;
    }
  },
  methods: {
    quizScore(quizId) {
      if (this.storageScore) {
        const quizScore = this.storageScore.find((s) => s.quizId === quizId);
        return quizScore ? `${quizScore.score}%` : "";
      }
      return "";
    },
    saveToLocalStorage(newResult) {
      if (!this.storageScore) {
        const newData = [newResult];
        window.localStorage["quizScore"] = JSON.stringify({ data: newData });
        this.storageScore = newData;
      } else {
        let newStorageValue = [...this.storageScore];
        const currentIndexQuiz = this.storageScore.findIndex(
          (s) => s.quizId === newResult.quizId
        );
        if (currentIndexQuiz > -1) {
          newStorageValue[currentIndexQuiz] = newResult;
        } else {
          newStorageValue.push(newResult);
        }

        // Sort by score
        newStorageValue = newStorageValue.sort((a, b) => {
          if (a && b) {
            if (a.score > b.score) {
              return -1;
            } else if (a.score < b.score) {
              return 1;
            }
          }
          return 0;
        });

        this.storageScore = newStorageValue;
        window.localStorage["quizScore"] = JSON.stringify({
          data: newStorageValue,
        });
      }
    },
    handleQuizClose() {
      this.selectedQuiz = null;
      this.isModalOpen = false;
    },
    handlePageChange(newPage) {
      this.activePage = newPage;
    },
    handleOpenQuiz(quizId) {
      let newSelectedQuiz = this.quizes.filter((q) => q.id === quizId);
      if (newSelectedQuiz?.length) {
        this.selectedQuiz = newSelectedQuiz[0];
        this.selectedQuizScore =
          this.storageScore?.find((q) => q.quizId === quizId) || null;
        this.isModalOpen = !this.isModalOpen;
      }
    },
  },
};
</script>

<style scoped>
.quize-preview {
  cursor: pointer;
}
</style>
