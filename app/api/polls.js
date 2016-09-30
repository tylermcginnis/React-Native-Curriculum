import { ref } from '~/config/constants'

export function increaseCount (id, index) {
  return ref.child(`pollData/${id}/${index}/count`)
    .transaction((count) => count += 1)
}

export function increaseNumOfResponses (id) {
  return ref.child(`pollPreviews/${id}/numOfResponses`)
    .transaction((count) => count += 1)
}

export function increaseUserNumOfResponses (authorId, pollId) {
  return ref.child(`users/${authorId}/ownPolls/${pollId}/numOfResponses`)
    .transaction((count) => count += 1)
}

export function addPollVotedOn (uid, id, index) {
  return ref.child(`users/${uid}/pollsVotedOn/${id}`)
    .set(index)
}