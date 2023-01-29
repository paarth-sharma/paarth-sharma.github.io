/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/","#new":""}
const engine = "duckduckgo"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/",
  duckduckgo: "https://duckduckgo.com/?q=",
  ecosia: "https://www.ecosia.org/search?q=",
  google: "https://www.google.com/search?q=",
  startpage: "https://www.startpage.com/search?q=",
  youtube: "https://www.youtube.com/results?q=",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  return engineUrls[engine] + value
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"yfeFnqSXY1mzV6Nv","label":"uni","bookmarks":[{"id":"nwjtWzvwcRoHY3uf","label":"thapar_lms","url":"https://lms.thapar.edu/moodle/my/"},{"id":"sWcVT7AmQyaHdtFY","label":"uni_mail","url":"https://mail.google.com/mail/u/1/#inbox"},{"id":"NC753ZgO51Lo0dvK","label":"classrooms","url":"https://classroom.google.com/u/1/h"}]},{"id":"EfuyyjA2jcji5uqY","label":"personal","bookmarks":[{"id":"Iz7x0sX79gCnmc35","label":"mail","url":"https://mail.google.com/mail/u/0/#inbox"},{"id":"1U9v0Fq365Xdshda","label":"whatsapp","url":"https://web.whatsapp.com/"},{"id":"byw5usfKmc8wyWdJ","label":"reddit","url":"https://www.reddit.com/"},{"id":"IrTbIK8alqkiab34","label":"github","url":"https://github.com/"}]},{"id":"IiWWV9DB85VgB0Nv","label":"resources/notes","bookmarks":[{"id":"EKfn1cDIEI6YYJue","label":"coe_2nd_year","url":"https://classroom.google.com/u/1/w/MTQyMTc3ODk3NDc5/t/all"},{"id":"jWp0poiLAy67IVKg","label":"notion","url":"https://www.notion.so/paarth-sharma/4639b66f91ff456cb14a8773827735fc?v=27bb427b38bb4b028efc6ac47552c39a"}]},{"id":"dbQ7ZkNHOl52QfJQ","label":"media","bookmarks":[{"id":"IBAfhajFHOLT72Rt","label":"youtube","url":"https://www.youtube.com/"},{"id":"mDcIvR3C9lv5x3oB","label":"prime_video","url":"https://www.primevideo.com/"},{"id":"NCXB88gPtpsrAv4j","label":"animesuge","url":"https://animesuge.to/home"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
