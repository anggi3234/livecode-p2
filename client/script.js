let baseurl = "http://localhost:3333/"

function auth() {
  if(!localStorage.getItem('access_token')){
    $("#login-container").show()
    $("#btn-logout").hide()
    $("#home-container").hide()
    $("#add-container").hide()
  } else {
    $("#login-container").hide()
    $("#btn-logout").show()
    $("#home-container").show()
    $("#add-container").show()
  }
}


function login() {
  const email = $("#email-login").val()
  const password = $("#password-login").val()

  $.ajax({
    url: baseurl + "login",
    method: "POST",
    data: {
      email,
      password
    }
  })
  .done(response => {
    auth()
  })
  .fail((xhr, text) => {
    console.log({xhr, text})
  })
  .always(_ => {
    $("#email-login").val("")
    $("#password-login").val("")
  })
}

function logout() {
  localStorage.removeItem("access_token")
}

function getWishlist() {
  $.ajax({
    url: baseurl + "wishlists",
    method: "GET",
    headers: {
      access_token: localStorage.getItem("access_token")
    }
  })
  .done(response => {
    if(!response) {
      $('#empty-wishlist').show()
    } else {
      response.forEach((el) => {
        $("wishlists").append(`
        <div class="col-4 mb-4">
        <img src="https://asset.kompas.com/crops/mcMptWeiOQIwUEiY6gV0O_2yaTQ=/0x0:0x0/780x390/data/photo/2014/03/08/0215393a6000-1780x390.jpg" class="card-img-top" alt="...">
        <div class="card text-center">
            <div class="card-body">
              <h5 class="card-title">${el.name}</h5>
              <p class="card-text">${el.price}</p>
              <button class="btn btn-dark" id="btn-delete-wl" type="submit">Delete</button>
            </div>
        </div>
      </div>`)
      })
    }
  })
  .fail((xhr, text) => {
    console.log(xhr, text)
  })
}

function addWishlist() {
  $.ajax({
    url: baseurl + "wishlists",
    method: "POST",
    headers: {
      access_token: localStorage.getItem("access_token")
    }
  })
  .done(response => {
    response.forEach((el) => {
      $("wishlists").append(`
      <div class="col-4 mb-4">
      <img src="https://asset.kompas.com/crops/mcMptWeiOQIwUEiY6gV0O_2yaTQ=/0x0:0x0/780x390/data/photo/2014/03/08/0215393a6000-1780x390.jpg" class="card-img-top" alt="...">
      <div class="card text-center">
          <div class="card-body">
            <h5 class="card-title">${el.name}</h5>
            <p class="card-text">${el.price}</p>
            <button class="btn btn-dark" id="btn-delete-wl" type="submit">Delete</button>
          </div>
      </div>
    </div>`)
    })
  })
  .fail((xhr, text) => {
    console.log(xhr, text)
  })
}

function deleteWishlist() {
  $.ajax({
    url: baseurl + `wishlists/${id}`,
    method: 'DELETE',
    headers: {
      access_token: localStorage.getItem("access_token")
    }
  })
  .done(response => {
    $(`#wishlists`).remove()
  })
  .fail((xhr, text) => {
    console.log(xhr, text)
  })
}

$(document).ready(() => {
  auth()

  $("#btn-login").on('submit', (el) => {
    el.preventDefault();
    login()
  })

  $("#btn-logout").on('click', (el) => {
    el.preventDefault();
    logout()
  })
})
