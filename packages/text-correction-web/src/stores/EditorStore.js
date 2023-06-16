import { defineStore } from "pinia";
// be careful the port should be 80 which is mapped of host, not the one in the container
const API_BASE_URL = 'http://localhost:80/api';

export const editorStore = defineStore("editorStore", {
  state: () => {
    return {
      source: '',
      results: [],
      loading: false,
    };
  },
  actions: {
    clear() {
      this.source = '';
      this.results = [];
    },
    setSource(text) {
      this.source = text;
    },
    audit() {
      this.loading = true;
      fetch(`${API_BASE_URL}/check`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: this.source,
        }),
      })
        .then(res => res.json())
        .then(data => data.data)
        .then(data => {
          if (data.error) {
            throw new Error(data.error);
          }
          const results = handleResult(data);
          this.results = results;
          this.loading = false;
        })
        .catch(error => {
          console.log(`error = `, error);
          alert(error);
          this.loading = false;
        });
    }
  },
  getters: {
    count(state) {
      if (!state.source) {
        return null;
      }
      return `全文字数: ${state.source.length}`;
    },
  }
});

function handleResult(data) {
  const resultsObj = data;
  const resultsArray = [
    ...resultsObj.punc,
    ...resultsObj.leader,
    ...resultsObj.org,
    ...resultsObj.pol,
    ...resultsObj.grammar_pc,
    ...resultsObj.order,
    ...resultsObj.idm,
    ...resultsObj.word,
    ...resultsObj.char,
    ...resultsObj.redund,
    ...resultsObj.miss,
    ...resultsObj.dapei,
    ...resultsObj.number,
    ...resultsObj.addr,
    ...resultsObj.name,
  ];
  resultsArray.sort((a, b) => {
    return a[0] - b[0];
  });
  const mappedArray = resultsArray.map((item, index) => {
    return {
      startPos: item[0],
      endPos: item[0] + item[1].length,
      origin: item[1],
      correct: item[2],
    };
  });
  return mappedArray;
}