import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js';
import { getDatabase, ref, set, onValue, get, child, push } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js';


const firebaseConfig = {
    apiKey: "AIzaSyBhxVWhbbjrM7eygmj92X7HpEdCZsrc1Sk",
    authDomain: "bookstore-6ffb9.firebaseapp.com",
    projectId: "bookstore-6ffb9",
    storageBucket: "bookstore-6ffb9.appspot.com",
    messagingSenderId: "707736113670",
    appId: "1:707736113670:web:db43e6ec937d417a432987"
};

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);


$(document).ready(function () {



    // admin panel search from api event

    $(".searchbtn").on("click", function () {
        event.preventDefault()
        var search = $(".searchinput").val().trim();
        var bookname = $("#bookname");
        var authorname = $("#authorname");
        var describtion = $("#describtion");
        var booktype = $("#booktype");
        var imgurl = $("#imgurl");


        $.ajax({
            url: `https://www.googleapis.com/books/v1/volumes?q=${search}`,
            method: 'GET'
        }).then(function (result) {
            $(bookname).val(result.items[0].volumeInfo.title);
            $(authorname).val(result.items[0].volumeInfo.authors[0]);
            $(describtion).val(result.items[0].volumeInfo.description);
            $(booktype).val(result.items[0].volumeInfo.categories[0]);
            $(imgurl).val(result.items[0].volumeInfo.imageLinks.smallThumbnail);
        })

        $(".searchinput").val("");

    })




})
// book  info  add event
$(".bookformbtn").on("click", function () {
    event.preventDefault();
    var bookname = $("#bookname").val().trim();
    var authorname = $("#authorname").val().trim();
    var describtion = $("#describtion").val().trim();
    var booktype = $("#booktype").val().trim();
    var imgurl = $("#imgurl").val().trim();
    var r = ref(db, `/Books/${bookname}`);
    set(r, {

        'authorname': authorname,
        'describtion': describtion,
        'booktype': booktype,
        'imgurl': imgurl

    })

    $("#bookname").val("");
    $("#authorname").val("");
    $("#describtion").val("");
    $("#booktype").val("");
    $("#imgurl").val("");

})
// about info add event
$(".aboutinfoadd").on("click", function () {
    event.preventDefault();
    var title = $("#abouttitle").val().trim();
    var imgurl = $("#aboutimgurl").val().trim();
    var describtion = $("#aboutdescribtion").val().trim();

    var r = ref(db, `/About`);
    set(r,
        {
            'book': title,
            'describtion': describtion,
            'imgurl': imgurl
        })


    $("#abouttitle").val("");
    $("#aboutimgurl").val("");
    $("#aboutdescribtion").val("");
})

// contactus info add event
$(".sendbtn").on("click", function () {
    event.preventDefault();
    var name = $("#contactnameinput").val().trim();
    var mail = $("#contactmailinput").val().trim();
    var adress = $("#contactadressinput").val().trim();
    var phone = $("#contactphoneinput").val().trim();


    var r = ref(db, `/Contactus/${name}`);
    set(r,
        {
            'mail': mail,
            'adress': adress,
            'phone': phone
        })
    $("#contactnameinput").val("");
    $("#contactmailinput").val("");
    $("#contactadressinput").val("");
    $("#contactphoneinput").val("");
})
// joinsus info add event
$("#modaljoinbtn").on("click", function () {
    event.preventDefault();
    var name = $("#modalnameinput").val().trim();
    var mail = $("#modalmailinput").val().trim();
   

    var r = ref(db, `/joinus/${name}`);
    set(r,
        {
            'mail': mail,
        })
    $("#modalnameinput").val("");
    $("#modalmailinput").val("");
   
})

// about onvalue
onValue(ref(db, "/About"), snapshot => {
    $("#abouttitle").html(snapshot.val().book);
    $("#abouttext").html(snapshot.val().describtion);
    $("#about-img").attr("src", snapshot.val().imgurl);

})


// contactus onvalue
onValue(ref(db, "/Contactus"), snapshot => {
    var a = snapshot.val();
    var array = Object.keys(a)
    console.log(array);
    for (let i in array) {
        var table = $(".contactustable");
        var tr = $("<tr>");
        table.append(tr);
        var index = $("<td>").html(i);
        var name = $("<td>").html(array[i]);
        var adress = $("<td>").html(snapshot.val()[array[i]].adress);
        var mail = $("<td>").html(snapshot.val()[array[i]].mail);
        var phone = $("<td>").html(snapshot.val()[array[i]].phone);

        tr.append(index, name, adress, mail, phone)


    }


})
// joinus onvalue
onValue(ref(db, "/joinus"), snapshot => {
    var a = snapshot.val();
    var array = Object.keys(a)
    for (let i in array) {
        var table = $(".contactustable");
        var tr = $("<tr>");
        table.append(tr);
        var index = $("<td>").html(i);
        var name = $("<td>").html(array[i]);
        var mail = $("<td>").html(snapshot.val()[array[i]].mail);

        tr.append(index, name, mail)


    }


})
