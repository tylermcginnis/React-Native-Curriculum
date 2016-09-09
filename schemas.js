Firebase
  /pollPreviews
    [id]
      id
      photoURL
      displayName
      uid
      title
      numOfResponses
  /pollData
    [id]
      0: {text, count}
      1: {text, count}
  /users
    [id]
      displayName
      uid
      photoURL
      pollsVotedOn
        id
          choice
      ownPolls
        id
          title
          numOfResponses

Redux
  polls
    listenerSet
    polls
      [id]
        uid
        displayName
        photoURL
        title
        numOfResponses
        options:
          0: {text, count}
          1: {text, count}
  authentication
    isAuthed
    isAuthenticating
    authedId
    displayName
    photoURL
    pollsVotedOn
      id
        choice
    ownPolls
      id
