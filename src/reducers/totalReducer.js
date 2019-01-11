export default function(state = null, action) {
  switch (action.type) {
    case "FETCH_POINTS":
      console.log(action.payload);
      return action.payload;
    default:
      return state;
  }
}
