let mood, audio, playbtn, nextbtn, prevbtn, mutebtn, seekslider, seeking = false, seekto,
    curtimetext, durtimetext, current_song, dir, playlist, ext, agent, repeat, setvolume, angry_playlist, angry_title,
    angry_poster, happy_playlist, happy_title, happy_poster, calm_playlist, calm_title, calm_poster, sad_playlist,
    sad_title, sad_poster, playlist_index;

dir = "static/songs/"

angry_playlist = ["Zinda Lyric Video - Bhaag Milkha Bhaag_Farhan Akhtar_Siddharth Mahadevan_Prasoon Joshi" ,
                    "ACDC-BackinBlack",
                    "YALGAAR - CARRYMINATI X Wily Frenzy",
                    "OhTheLarceny-ManonaMission", 
                    "LedZeppelin-ImmigrantSong"];

angry_title = ["Zinda - Bhaag Milkha Bhaag",
                "ACDC - Back in Black",
                "YALGAAR - CARRYMINATI X Wily Frenzy", 
                "Oh The Larceny - Man on a Mission", 
                "Led Zeppelin - Immigrant Song"];

angry_poster = ["static/song_imgs/zinda.jpg",
                    "static/song_imgs/back_in_black.jpg",
                    "static/song_imgs/yalgaar.jpg", 
                    "static/song_imgs/man_on_a_mission.jpg", 
                    "static/song_imgs/immigrant_song.jpg"];




happy_playlist = ["OH Ho Ho Ho _ ORIGINAL SONG _ Ishq Tera Tadpave _ Sukhbir _ Original Video",
                    "BTS (방탄소년단) 'Dynamite' Official MV",
                    "Tunak Tunak Tun - Daler Mehndi_Official Video_Sanjeev Anand_Shahab Allahabadi_Yogesh",
                    "WillPharrell-Happy",
                    "Full Video -Aao Milo Chalen_Jab We Met_Shahid Kapoor, Kareena Kapoor_Pritam, Shaan, Ustad Sultan Khan",
                    "Kool&TheGang-Celebration",
                    "Ude Dil Befikre Song _ Befikre _ Ranveer Singh, Vaani Kapoor, Benny Dayal, Vishal & Shekhar, Jaideep",
                    "RickAstley-NeverGonnaGiveYouUp"];

happy_title = ["OH Ho Ho Ho - Ishq Tera Tadpave - Sukhbir ",
                "BTS - Dynamite",
                "Tunak Tunak Tun - Daler Mehndi",
                "Will Pharrell - Happy",
                "Aao Milo Chalen - Jab We Met", 
                "Kool & The Gang - Celebration",
                "Ude Dil Befikre - Befikre", 
                "Rick Astley - Never Gonna Give You Up"];

happy_poster = ["static/song_imgs/ishq_tera_tadpave.jfif",
                "static/song_imgs/dynamite.jpg",
                "static/song_imgs/Tunak_Tunak_Tun.jpg",
                "static/song_imgs/happy.jpg",
                "static/song_imgs/aao_milo_chale.jpg", 
                "static/song_imgs/celebration.jpg", 
                "static/song_imgs/Ude_Dil_Befikre.jfif",
                "static/song_imgs/never_gonna_give_you_up.jpg"];




calm_playlist = ["BROWN MUNDE - AP DHILLON _ GURINDER GILL _ SHINDA KAHLON _ GMINXR",
                    "RISE (ft. The Glitch Mob, Mako, and The Word Alive) _ Worlds 2018 - League of Legends",
                    "Namo Namo - Lyrical _ Kedarnath _ Sushant Rajput _ Sara Ali Khan _ Amit Trivedi _ Amitabh B",
                    "SmashMouth-AllStar", 
                    "DJOkawari-SpeedofLight", 
                    "BillieEilish-BadGuy"];

calm_title = ["BROWN MUNDE - AP DHILLON",
                "RISE - League of Legends",
                "Namo Namo - Kedarnath",
                "Smash Mouth - All Star", 
                "DJ Okawari - Speed of Light", 
                "Billie Eilish - Bad Guy"];

calm_poster = ["static/song_imgs/brown_munde.jfif",
                "static/song_imgs/rise_lol.jpg",
                "static/song_imgs/namo_namo.jpg",
                "static/song_imgs/all_star.jpeg", 
                "static/song_imgs/speed_of_light.jpg", 
                "static/song_imgs/bad_guy.jpg"];




sad_playlist = ["Die For You ft. Grabbitz _ Official Music Video _ VALORANT Champions 2021",
                "Full Song - Tujhe Kitna Chahne Lage _ Kabir Singh _ Mithoon Feat. Arijit Singh _ Shahid K, Kiara A",
                "Legends Never Die (ft. Against The Current) _ Worlds 2017 - League of Legends",
                "Adele-Hello", 
                "James Arthur - Impossible (Official Video)",
                "CelineDion-MyHeartWillGoOn", 
                "Zariya - Khoya (feat. Aseem) [Official Audio]",
                "GaryJules-MadWorld"];

sad_title = ["Die For You - VALORANT Champions 2021",
                "Tujhe Kitna Chahne Lage - Kabir Singh - Mithoon Feat. Arijit Singh",
                "Legends Never Die - League of Legends",
                "Adele - Hello", 
                "James Arthur - Impossible",
                "Celine Dion - My Heart Will Go On", 
                "Zariya - Khoya",
                "Gary Jules - Mad World"];

sad_poster = ["static/song_imgs/die_for_you_valo.jpg",
                "static/song_imgs/tujhe_kitna_chahane_lage_hum.jpg",
                "static/song_imgs/legends_never_die.jpg",
                "static/song_imgs/hello.JPG", 
                "static/song_imgs/James_Arthur_Impossible.jpg",
                "static/song_imgs/my_heart_will_go_on.jpg", 
                "static/song_imgs/zariya_khoya.jpg",
                "static/song_imgs/mad_world.jpg"];

ext = ".mp3";
agent = navigator.userAgent.toLowerCase()

playbtn = document.getElementById("playpausebtn");
nextbtn = document.getElementById("nextbtn");
prevbtn = document.getElementById("prevbtn");
mutebtn = document.getElementById("mutebtn");
seekslider = document.getElementById("seekslider");
curtimetext = document.getElementById("curtimetext");
durtimetext = document.getElementById("durtimetext");
current_song = document.getElementById("current_song");
repeat = document.getElementById("repeat");

audio = new Audio();
audio.loop = false;

Webcam.set({
    width: 120,
    height: 90,
    image_format: 'jpeg',
    jpeg_quality: 90
});
Webcam.attach('#imageCapture');

playbtn.addEventListener("click", playPause);
nextbtn.addEventListener("click", () => { nextSong(mood) });
prevbtn.addEventListener("click", () => { prevSong(mood) });
seekslider.addEventListener("mousedown", function (event) {
    seeking = true;
    seek(event);
});
seekslider.addEventListener("mousemove", function (event) {
    seek(event);
})
seekslider.addEventListener("mouseup", function () {
    seeking = false;
})
audio.addEventListener("timeupdate", function () {
    seektimeupdate();
})
audio.addEventListener("ended", function () {
    switchTrack(mood);
})
repeat.addEventListener("click", loop);


function fetchMusicDetails(mood) {
    $("#playpausebtn img").attr("src", "static/imgs/pause.png");
    switch (mood) {
        case "Angry":
            $("#circle-image img").attr("src", angry_poster[playlist_index]);
            current_song.innerHTML = angry_title[playlist_index];
            audio.src = dir + angry_playlist[playlist_index] + ext;
            break;

        case "Happy":
            $("#circle-image img").attr("src", happy_poster[playlist_index]);
            current_song.innerHTML = happy_title[playlist_index];
            audio.src = dir + happy_playlist[playlist_index] + ext;
            break;

        case "Calm":
            $("#circle-image img").attr("src", calm_poster[playlist_index]);
            current_song.innerHTML = calm_title[playlist_index];
            audio.src = dir + calm_playlist[playlist_index] + ext;
            break;

        case "Sad":
            $("#circle-image img").attr("src", sad_poster[playlist_index]);
            current_song.innerHTML = sad_title[playlist_index];
            audio.src = dir + sad_playlist[playlist_index] + ext;
            break;
    }
    audio.play();
}

function playPause() {
    console.log("hello playpause")
    if (audio.paused) {
        audio.play();
        $("#playpausebtn").attr("src", "static/imgs/pause.png");
    } else {
        audio.pause();
        $("#playpausebtn").attr("src", "static/imgs/play.png");
    }
}

function nextSong(mood) {
    playlist_index++;
    switch (mood) {
        case "Angry":
            if (playlist_index > angry_playlist.length - 1) {
                playlist_index = 0;
            }
            break;
        case "Happy":
            if (playlist_index > happy_playlist.length - 1) {
                playlist_index = 0;
            }
            break;
        case "Calm":
            if (playlist_index > calm_playlist.length - 1) {
                playlist_index = 0;
            }
            break;
        case "Sad":
            if (playlist_index > sad_playlist.length - 1) {
                playlist_index = 0;
            }
            break;
    }
    fetchMusicDetails(mood);
}

function prevSong(mood) {
    playlist_index--;
    switch (mood) {
        case "Angry":
            if (playlist_index < 0) {
                playlist_index = angry_playlist.length - 1;
            }
            break;
        case "Happy":
            if (playlist_index < 0) {
                playlist_index = happy_playlist.length - 1;
            }
            break;
        case "Calm":
            if (playlist_index < 0) {
                playlist_index = calm_playlist.length - 1;
            }
            break;
        case "Sad":
            if (playlist_index < 0) {
                playlist_index = sad_playlist.length - 1;
            }
            break;
    }
    fetchMusicDetails(mood);
}

function mute() {
    if (audio.muted) {
        audio.muted = false;
        $("#mutebtn img").attr("src", "static/imgs/speaker.png");
    } else {
        audio.muted = true;
        $("#mutebtn img").attr("src", "static/imgs/mute.png");
    }
}

function seek(event) {
    if (audio.duration == 0) {
        null
    } else {
        if (seeking) {
            seekslider.value = event.clientX - seekslider.offsetLeft;
            seekto = audio.duration * (seekslider.value / 100);
            audio.currentTime = seekto;
        }
    }
}


function seektimeupdate() {
    if (audio.duration) {
        let temp = audio.currentTime * (100 / audio.duration);
        seekslider.value = temp;
        var curmins = Math.floor(audio.currentTime / 60);
        var cursecs = Math.floor(audio.currentTime - curmins * 60);
        var durmins = Math.floor(audio.duration / 60);
        var dursecs = Math.floor(audio.duration - durmins * 60);
        if (cursecs < 10) {
            cursecs = "0" + cursecs
        }
        if (curmins < 10) {
            curmins = "0" + curmins
        }
        if (dursecs < 10) {
            dursecs = "0" + dursecs
        }
        if (durmins < 10) {
            durmins = "0" + durmins
        }
        curtimetext.innerHTML = curmins + ":" + cursecs;
        durtimetext.innerHTML = durmins + ":" + dursecs;
    } else {
        curtimetext.innerHTML = "00:00";
        durtimetext.innerHTML = "00:00";
    }
}

function switchTrack(mood) {
    switch (mood) {
        case "Angry":
            if (playlist_index == angry_playlist.length - 1) {
                playlist_index = 0;
            } else {
                playlist_index++;
            }
            break;
        case "Happy":
            if (playlist_index == happy_playlist.length - 1) {
                playlist_index = 0;
            } else {
                playlist_index++;
            }
            break;
        case "Calm":
            if (playlist_index == calm_playlist.length - 1) {
                playlist_index = 0;
            } else {
                playlist_index++;
            }
            break;
        case "Sad":
            if (playlist_index == sad_playlist.length - 1) {
                playlist_index = 0;
            } else {
                playlist_index++;
            }
            break;
    }
    fetchMusicDetails(mood);
}

function loop() {
    if (audio.loop) {
        audio.loop = false;
        $("#repeat img").attr("src", "static/imgs/loop.png");
    } else {
        audio.loop = true;
        $("#repeat img").attr("src", "static/imgs/loop1.png");
    }
}

document.querySelector('#test').addEventListener('click', function () {
    getExpression();
});

const getExpression = () => {
    Webcam.snap(image_uri => {
        console.log(image_uri)
        fetch('/expression', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ image_uri: image_uri })
        }).then(response => {
            return response.json();
        }).then(res => {
            mood = res.mood;
            mood = mood.charAt(0).toUpperCase() + mood.slice(1);
            document.querySelector('#status').innerHTML = `Current Mood: ${mood}`;
            switch (mood) {
                case "Angry":
                    playlist_index = 0;
                    audio.src = dir + angry_playlist[0] + ext;
                    current_song.innerHTML = angry_title[playlist_index];
                    $("#circle-image img").attr("src", angry_poster[playlist_index]);
                    $("div.main__div").css("background-color", "#F7C6CC");
                    $("div.backgroundre").css("background-color", "#CE3F3E");
                    break;
                case "Happy":
                    playlist_index = 0;
                    audio.src = dir + happy_playlist[0] + ext;
                    current_song.innerHTML = happy_title[playlist_index];
                    $("#circle-image img").attr("src", happy_poster[playlist_index]);
                    $("div.main__div").css("background-color", "#FFE77B");
                    $("div.backgroundre").css("background-color", "#2D5F2E");
                    break;
                case "Calm":
                    playlist_index = 0;
                    audio.src = dir + calm_playlist[0] + ext;
                    current_song.innerHTML = calm_title[playlist_index];
                    $("#circle-image img").attr("src", calm_poster[playlist_index]);
                    $("div.main__div").css("background-color", "#C4F5D6");
                    $("div.backgroundre").css("background-color", "#AB96DB");
                    break;
                case "Sad":
                    playlist_index = 0;
                    audio.src = dir + sad_playlist[0] + ext;
                    current_song.innerHTML = sad_title[playlist_index];
                    $("#circle-image img").attr("src", sad_poster[playlist_index]);
                    $("div.main__div").css("background-color", "#418EC7");
                    $("div.backgroundre").css("background-color", "#1F2962");
                    break;
            }
        });
    });
}

setTimeout(() => { getExpression() }, 2000);




// http://127.0.0.1:8000/static/songs/ACgetExpressionDC-BackinBlack.mp3