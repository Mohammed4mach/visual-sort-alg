const btn_randomize   = document.querySelector(".btn-randomize");
const btn_sort        = document.querySelector("#btn-sort");
const cards_container = document.querySelector(".cards-container");
const steps_count     = document.querySelector("#steps-count");
let chosen_technique  = document.querySelector("input[name='srt-technique']:checked") === null
						? null
						: document.querySelector("input[name='srt-technique']:checked").value;

// Implementing the techniques
const sort_techniques = {};

// Sleep function to monitoring sorting process
const sleep = duration => new Promise((resolver) => setTimeout(resolver, duration));

// Swap with animation
const swapCards = async function(card1, card2)
{
	let temp;
	
	// Colorize both cards
	card1.style.backgroundColor = card2.style.backgroundColor = "chocolate";
	await sleep(500);

	// Swapping
	temp = card1.innerText;
	card1.innerText = card2.innerText;
	card2.innerText = temp;

	steps_count.innerText++;

	// Restore Colors
	await sleep(75);
	card1.style.backgroundColor = card2.style.backgroundColor = null;

	await sleep(275);
}

// Assign with animation
const assignCards = async function(card1, card2)
{
	// Colorize both cards
	card1.style.backgroundColor = card2.style.backgroundColor = "chocolate";
	await sleep(500);

	// Assigning
	card1.innerText = card2.innerText;

	steps_count.innerText++;

	// Restore Colors
	await sleep(75);
	card1.style.backgroundColor = card2.style.backgroundColor = null;

	await sleep(275);
}

// Selection Sort
sort_techniques.selection = async function()
{
	
	let chldrn = cards_container.children;
	let min_position = 0;

	for(let i = 0; i < chldrn.length; i++)
	{
		min_position = i;

		for(let curr = i; curr < chldrn.length; curr++)
		{	
			if(Number(chldrn[curr].innerText) < Number(chldrn[min_position].innerText))
				min_position = curr;
		}

		console.log(`Swapping ${chldrn[i].innerText} with ${chldrn[min_position].innerText} ...`);
		await swapCards(chldrn[i], chldrn[min_position]); 
	}
}

// Bubble Sort
sort_techniques.bubble = async function()
{	
	let chldrn = cards_container.children;
	let check = true;

	for(let i = 0; i < chldrn.length; i++)
	{
		for(let j = 1; j < chldrn.length - i; j++)
		{
			if(Number(chldrn[j - 1].innerText) > Number(chldrn[j].innerText))
			{
				console.log(`Swapping ${chldrn[j - 1].innerText} with ${chldrn[j].innerText} ...`);
				await swapCards(chldrn[j - 1], chldrn[j]);
				check = false;
			}
		}

		if(check) break;
	}
}

// Insertion Sort
sort_techniques.insertion = async function()
{
	let chldrn = cards_container.children;
	let k = {style: {backgroundColor: null}};

	for(let i = 1; i < chldrn.length; i++)
	{
		chldrn[i].style.backgroundColor = "cornflowerblue"; // Highlighting the key
		await sleep(500);

		k.innerText = chldrn[i].innerText;
		let j = i - 1;

		while(j >= 0 && Number(chldrn[j].innerText) > Number(k.innerText))
		{
			console.log(`Assigning ${chldrn[j + 1].innerText} with ${chldrn[j].innerText}`);
			await assignCards(chldrn[j + 1], chldrn[j]);
			j--;
		}

		console.log(`Assigning ${chldrn[j + 1].innerText} with ${k.innerText}`);
		await assignCards(chldrn[j + 1], k);
	}
}

// Merge Sort
// Auxiliary Functions for Merge Sort
const linearMerge = async function(l, m, r)
{
	let arr = cards_container.children;

	let n1 = m - l + 1;
	let n2 = r - m;

	let L = [];
	let R = [];

	let i, j;

	for(i = 0; i < n1; ++i)
		L[i] = arr[l + i];

	for(j = 0; j < n2; ++j)
		R[j] = arr[m + 1 + j];

	i = 0;
	j = 0;
	let k = l;
	while(i < n1 && j < n2)
	{
		if(Number(L[i].innerText) <= Number(R[j].innerTexT))
		{
			console.log(`Assigning ${arr[j + 1].innerText} with ${L[i].innerText}`);
			await assignCards(arr[k], L[i]);
			//arr[k] = L[i];
			i++;
		}
		else
		{
			console.log(`Assigning ${arr[k].innerText} with ${R[j].innerText}`);
			await assignCards(arr[k], R[j]);
			//arr[k] = R[j];
			j++;
		}
		k++;
	}

	while(i < n1)
	{
		console.log(`Assigning ${arr[k].innerText} with ${L[i].innerText}`);
		await assignCards(arr[k], L[i]);
		//arr[k] = L[i];
		i++;
		k++;
	}

	while(j < n2)
	{
		console.log(`Assigning ${arr[k].innerText} with ${R[j].innerText}`);
		await assignCards(arr[k], R[j]);
		//arr[k] = R[j];
		j++;
		k++;
	}
}

const sortMerge = async function(l, r)
{
	if(l < r) {

	let m = l + (r - l) / 2;

	await sortMerge(l, m);
	await sortMerge(m + 1, r);
	await linearMerge(l, m, r);
	}
}

sort_techniques.merge = async () => await sortMerge(0, cards_container.children.length);

// Quick Sort
// Auxiliary function for Quick Sort
let partition = async function(l, u, p)
{
	let arr = cards_container.children;
	let pivot = arr[u];
	p = l - 1;

	pivot.style.backgroundColor = "cornflowerblue"; // Highlighting the key
	await sleep(500);

	for(let i = l; i < u; i++)
	{
		if(Number(arr[i].innerText) < Number(pivot.innerText))
		{
			console.log(`Swapping ${arr[i].innerText} with ${arr[p + 1].innerText}`);
			await swapCards(arr[i], arr[ ++p ]);
		}
	}

	console.log(`Swapping ${arr[u].innerText} with ${arr[p + 1].innerText}`);
	await swapCards(arr[u], arr[ ++p ]);

	return p;
}

let quickSort = async function(l, u)
{
	let p = 0;

	if(l < u)
	{
		p = await partition(l, u, p);
		await quickSort(l, p - 1);
		await quickSort(p + 1, u);
	}
}

sort_techniques.quick = async () => await quickSort(0, cards_container.children.length - 1);

// Bucket Sort
// Auxiliary function for Bucket Sort
let partitionArr = function(arr, l, u, p) // For sorting arrays not cards
{
	let pivot = arr[u];
	let temp;
	p = l - 1;

	for(let i = l; i < u; i++)
	{
		if(arr[i] < pivot)
		{
			temp = arr[i];
			arr[i] = arr[ ++p ];
			arr[p] = temp;
		}
	}

	temp = arr[u];
	arr[u] = arr[ ++p ];
	arr[p] = temp;

	return p;
}

let quickSortArr = function(arr, l, u)
{
	let p = 0;

	if(l < u)
	{
		p = partitionArr(arr, l, u, p);
		quickSortArr(arr, l, p - 1);
		quickSortArr(arr, p + 1, u);
	}
}

let h = function(x, b)
{
	return Number(Math.ceil(x * b) % b);
}

let bucketSort = async function(n, b)
{
	let count = [];
	let arr = cards_container.children;
	let R = [];

	for(let i = 0; i < n; i++)
		count[i] = 0;
	
	for(let i = 0; i < n; i++)
	{
		let j = h(Number(arr[i].innerText), b);
		count[j]++;
	}

	for(let i = 0; i < b - 1; i++)
		count[i + 1] += count[i];

	for(let i = 0; i < n; i++)
	{
		let j = h(Number(arr[i].innerText), b);
		R[count[j]] = Number(arr[i].innerText);
		count[j]--;
	}

	let bucket_trace = [];
	for(let i = 0; i < b; i++)
		bucket_trace[i] = {f_index: 0, l_index: 0};

	for(let i = 1; i <= n; i++)
	{
		let j = h(R[i], b);

		if(bucket_trace[j].f_index === 0) bucket_trace[j].f_index = i;
		bucket_trace[j].l_index++;
	}

	// Sort the buckets
	for(let {f_index, l_index} of bucket_trace)
	{
		if(f_index !== 0) // Not equals zero
			quickSortArr(R, f_index, f_index + l_index);
	}

	for(let i = 0; i < arr.length; i++)
	{
		let tempCard = {style: {backgroundColor: null}};
		tempCard.innerText = R[i + 2];

		console.log(`Assign ${arr[i].innerText} with ${tempCard.innerText}`);
		await assignCards(arr[i], tempCard);
	}
}

sort_techniques.bucket = async () => await bucketSort(cards_container.children.length, cards_container.children.length + 1)

// Count Sort
sort_techniques.count = async function()
{
	let arr = cards_container.children;
	let output = [];
	let count = [];

	for(let i = 0; i < 10000; i++)
		count[i] = 0;

	for(let i = 0; i < arr.length; i++)
		++count[Number(arr[i].innerText)];

	for(let i = 1; i < 10000; i++)
		count[i] += count[i - 1];

	for(let i = arr.length - 1; i >= 0; i--)
	{
		output[count[Number(arr[i].innerText)] - 1] = Number(arr[i].innerText);
		--count[Number(arr[i].innerText)];
	}

	for(let i = 0; i < arr.length; i++)
	{	
		let tempCard = {style: {backgroundColor: null}};
		tempCard.innerText = output[i];

		console.log(`Assign ${arr[i].innerText} with ${tempCard.innerText}`);
		await assignCards(arr[i], tempCard);
	}
}

// Radix Sort
// Auxiliary function for Radix Sort
let countingSort = async function(size, div)
{
	let arr = cards_container.children;
	let output = [];
	let count = [];

debugger;
	for(let i = 0; i < 10; i++)
		count[i] = 0;

	for(let i = 0; i < size; i++)
	{
		let j = Math.floor(Number(arr[i].innerText) / div);
		count[j % 10]++;
	}

	for(let i = 1; i < 10; i++)
		count[i] += count[i - 1];

	for(let i = size - 1; i >= 0; i--)
	{
		let num = Number(arr[i].innerText);
		let j = Math.floor(num / div) % 10;

		output[count[j] - 1] = num;
		count[j]--;
	}

	for(let i = 0; i < size; i++)
	{	
		let tempCard = {style: {backgroundColor: null}};
		tempCard.innerText = output[i];

		console.log(`Assign ${arr[i].innerText} with ${tempCard.innerText}`);
		await assignCards(arr[i], tempCard);
	}
}

sort_techniques.radix = async function()
{
	let arr = cards_container.children;
	let values = [...arr].map(elem => Number(elem.innerText)); // Get values of the elements
	let mx = values.reduce( (a, b) => a > b ? a : b );

	for(let div = 1; Math.floor(mx / div) > 0; div *= 10)
		await countingSort(arr.length, div);
}


// Buttons Functions
btn_randomize.onclick = function()
{
	let cards = [...cards_container.children];

	cards.forEach(card => card.innerText = Math.floor(Math.random() * 101));
}

btn_sort.onclick = technique => {
	steps_count.innerText = 0;

	if(chosen_technique)
		sort_techniques[chosen_technique]()
	else
		console.log("No technique has been chosen");
}

const changeTechnique = radio => chosen_technique = radio.value;

