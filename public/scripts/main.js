onload = function () {
    // 변환 버튼
    var changeButton = document.querySelector("#change-button");

    // 남자,여자 아이콘
    var manIcon = document.querySelector("#man");
    var womanIcon = document.querySelector("#woman");

    // 장애인화장실, 아기 거치대 아이콘
    var disabled = document.querySelector("#disabled");
    var baby = document.querySelector("#baby");

    // 태그
    var tags = document.querySelectorAll(".tag");

    // 태그 속 성별
    var men = document.querySelectorAll(".man");
    var women = document.querySelectorAll(".woman");

    

    // for (var i = 0; i < women.length; i++) {
    //     var woman = women[i];
    // }

    // 여자 태그를 논리적으로 모두 숨김
    for (var woman of women) {
        woman.hidden = true;
    }


    // 변환 버튼 클릭
    changeButton.addEventListener("click", function () {
        // 각 성별에 따른 태그 숨기거나 나타나게
        for (var woman of women) {
            if (woman.hidden == true) {
                woman.hidden = false;
            } else {
                woman.hidden = true;
            }
        }
        for (var woman of women) {
            if (man.hidden == true) {
                man.hidden = false;
            } else {
                man.hidden = true;
            }
        }

        // 각 성별에 맞는 아이콘으로 변환
        if (manIcon.hidden == true) {
            manIcon.hidden = false;
            womanIcon.hidden = true;
        } else {
            manIcon.hidden = true;
            womanIcon.hidden = false;
        }
        
    })


    for (var tag of tags) {
        tag.addEventListener("click", function () {
            var occupiedToilet = tag.querySelector(".occupied-toilet");
            var totalToilet = tag.querySelector(".total-toilet");

            document.querySelector("#occupiedToilet").textContent = occupiedToilet.textContent;
            document.querySelector("#totalToilet").textContent = totalToilet.textContent;


            // 태크에 "disabled"이라는 클래스가 있으면 "soft"클래스를 추가하고 아니면 "soft"를 제거
            if (tag.classList.contains("disabled")) {
                tag.classList.remove("soft");
            } else {
                tag.classList.add("soft");
            }
            if (tag.classList.contains("baby")) {
                tag.classList.remove("soft");
            } else {
                tag.classList.add("soft");
            }



        })
    }


};