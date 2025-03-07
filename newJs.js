const checkElements = setInterval(() => {
	
    const parentElement = document.querySelector("#totalStatus");

    if (parentElement) {
        /*ОБЩЕЕ ПРИ ЗАПУСКЕ*/
        
        		//Находим нужный блок
        		totalStatusList = document.querySelector(".totalStatusList");
		        //скрываем блок с заказами в работе по умолчанию
		        totalStatusList.style.display = "none";
        
        /*ДЛЯ БЛОКА НА ПЕЧАТЬ*/
        
        		//Переиминовываем
        		document.querySelector('.in').childNodes[0].textContent = 'Новые заказы: ';
		        //поиск нужного дива
		        const printlistIn = document.querySelector(".totalPrintList > .in");
		        //создаем новую кнопку
		        let printButton = document.createElement("button");
		        printButton.textContent = "Распечатать";
		        printButton.className = "printButton";
		        printButton.setAttribute('type', 'button');
		        printButton.setAttribute('id', 'printOnlyMe');
		        printlistIn.appendChild(printButton);
		        //ловим клик по новой кнопке
		        printButton.addEventListener("click",()=>{
		        	alert("печатать");
		        });
        
        
        
        /*НОВАЯ ТАБЛИЦА ЗАКАЗОВ СБОРКИ*/
        
		        //создаем новый блок (таблицу) заказы в работе
		        const collectingNow = document.createElement("div");
		        const cnTitle = document.createElement("h2");
		        collectingNow.className = "collectingNow";
		        parentElement.appendChild(collectingNow);
		        cnTitle.textContent = "Все заказы на сборке:";
		        
		        
						//функции для новой таблицы
		        function extractData(storeName) {
		            const storeDivs = document.querySelectorAll(".in");
		            for (const storeDiv of storeDivs) {
		                const span = storeDiv.querySelector("span");
		                if (span && span.parentElement.textContent.includes(storeName)) {
		                    const list = storeDiv.querySelector(".list");
		                    return list 
		                        ? Array.from(list.querySelectorAll("a"))
		                              .map(a => a.outerHTML)
		                              .join("<br>")
		                        : "-";
		                }
		            }
		            return "-";
		        }
		
		        function createTable() {
		            const table = document.createElement("table");
		            table.style.borderCollapse = "collapse";
		            table.style.width = "100%";
		            table.style.border = "1px solid black";
		
		            // Создаем заголовок таблицы
		            const thead = table.createTHead();
		            const headerRow = thead.insertRow();
		            const headers = ["WB", "Ozon", "Yandex"];
		
		            headers.forEach(text => {
		                const th = document.createElement("th");
		                th.textContent = text;
		                th.style.border = "1px solid black";
		                th.style.padding = "8px";
		                th.style.textAlign = "center";
		                th.style.background = "#f0f0f0";
		                headerRow.appendChild(th);
		            });
		
		            // Создаем тело таблицы
		            const tbody = table.createTBody();
		            const row = tbody.insertRow();
		
		            // Заполняем данными
		            ["WBs", "Ozon", "Yandex"].forEach(store => {
		                const cell = row.insertCell();
		                cell.style.border = "1px solid black";
		                cell.style.padding = "8px";
		                cell.style.textAlign = "center";
		                cell.innerHTML = extractData(store);
		            });
		
		            return table;
		        }
		
		        // Добавляем таблицу
		        collectingNow.appendChild(cnTitle);
		        collectingNow.appendChild(createTable());
		        
		    /*БЛОК (БИНД) РАЗМЕРЫ КОРОБОК ПО УМОЛЧАНИЮ*/
		    
		    	//создаем общий БЛОК
		    	const boxSelection = document.createElement("div");
		    	const boxSelectionBlock = document.createElement("div");
		    	
		    
		    	//заголовок
		    	const header = document.createElement("h2");
		    	header.textContent = "Выберите короб:";
		    	boxSelection.prepend(header);
		    	
		    	boxSelection.className = "boxSelection";
		    	parentElement.appendChild(boxSelection);
		    	
		    	boxSelectionBlock.className = "boxSelectionBlock";
		    	boxSelection.appendChild(boxSelectionBlock);
		    	
		    	let paramArray = [
					    "23/20/10",
					    "30/20/10",
					    "30/20/10",
					    "30/20/10",
					    "30/20/10",
					    "30/20/10"
					];
					
					// Создаем блоки, каждый с одним значением из paramArray
					paramArray.forEach((value) => {
					    const boxOptions = document.createElement("div");
					    const boxOptionsImg = document.createElement("div");
					    const boxOptionsText = document.createElement("div");
					
					    boxOptions.className = "boxOptions";
					    boxOptionsImg.className = "boxOptionsImg";
					    boxOptionsText.className = "boxOptionsText";
					
					    boxOptions.appendChild(boxOptionsImg);
					
					    const textElement = document.createElement("div");
					    textElement.textContent = value;
					    boxOptionsText.appendChild(textElement);
					
					    boxOptions.appendChild(boxOptionsText);
					    boxSelectionBlock.appendChild(boxOptions);
					});
		    		

		    	

      
        clearInterval(checkElements); // Останавливаем проверку
    }
}, 500);
