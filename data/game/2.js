() => {
	const rootURL = "/data/game/2/";
	const visit = (vars) => Object.assign({}, vars, {hasVisited: true});
	return {
	title: "Can you solve the murder?",
	variables: {detective:0, hasVisited:false},
	states: [
		{
			id: "default",
			body: {
				title: "There has been a murder!", 
				image: rootURL + "corpse.jpg",
				text:"This morning, the corpse of local millionaire Cornelius C. Bryant was discovered in one of the many king-sized beds in his lavish mansion.Authorities initially suspected that the old fart had died of natural causes, but the coroner's report revealed he had been smothered with his pillow! Do you think you have what it takes to crack the case?"
			},
			choices: [
				{
					name: "No trouble at all! I am Rutherford S. Godfried, the greatest detective the world has ever known!",
					action: (vars) => Object.assign({}, vars, {detective: 1}),
					next: "foyer",
				},
				{
					name: "Although I am just a humble pastry chef, I will try my best.",
					action: (vars) => Object.assign({}, vars, {detective: 2}),
					next: "foyer",
				}
			]
		},
		{
			id: "foyer",
			body: {
				image: rootURL + "foyer.jpg",
				text: "The local police chief has gathered up the main suspects in the foyer: the maid, the butler, and the wild-eyed, blood-soaked drifter.",
			},
			choices: [
				{
					name: "Interrogate the maid",
					next: "maid",
					action: visit
				},
				{
					name: "Interrogate the butler",
					next: "butler",
					action: visit
				},
				{
					name: "Interrogate the drifter",
					next: "drifter",
					action: visit
				},
				{
					name: "Arrest the perpetrator",
					next: (vars) => (vars.hasVisited) ? "arrest" : "premature_arrest"
				},
			]
		},
		{
			id: "premature_arrest",
			body: (vars) => {
				let b = {image: rootURL + "foyer.jpg"};
				if (vars.detective === 1) {
					return Object.assign(b, {
						text: 'The police chief shoots you a quizzical look. \n"With all due respect, Mr. Godfried, don\'t you think you should talk to at least one of the suspects before jumping to any conclusions?" he asks. "You\'re the expert, so I will follow your lead...but we like to play things by the book \'round these parts."'
					})
				}
				return Object.assign(b, {
					text: 'The police chief shoots you a quizzical look. \n"Umm, that seems a little premature," he says. "If this doesn\'t work out, I\'m going to really regret giving an untrained pastry chef a badge and a gun."'
				})
			},
			choices: (vars) => {
				if (vars.detective === 1) {return [
					{
						type: "speech",
						name: "Never question my methods, buster. I know what I'm doing.",
						next: "premature_arrest_go"
					},
					{
						type: "speech",
						name: "I was just kidding. Did you really think an expert investigator like myself would be so hasty?",
						next: "premature_arrest_back"
					}
				]}
				return [
					{
						type: "speech",
						name: "You may have decades of experience as a lawman, but I have a baker\'s intuition. This killer is toast.",
						next: "premature_arrest_go",
					},
					{
						name: "Humbly accept that you know less about investigation than you do about cakes",
						next: "foyer",
					}
				]
			}
		},
		{
			id: "premature_arrest_go",
			body: (vars) => {
				let b = {image: rootURL + "foyer.jpg"}
				if (vars.detective === 1) {
					return Object.assign(b, {text: '"My apologies, sir," he stammers. "I know you\'re the best of the best, and it isn\'t my place to question your wisdom. Ready when you are."'});
				}
				return Object.assign(b, {text: 'The chief hesitates for a moment, then shrugs. "Well, in that case, go right ahead," he says. \n He doesn\'t seem very confident.'});
			},
			choices: [{name:"", next:"arrest"}]
		},
		{
			id: "arrest",
			body: {
				text: "The suspects and the chief gather in front of the fireplace, anxiously awaiting your big reveal.",
				image: rootURL + "foyer.jpg"
			},
			choices: [{type:"speech", name:"After a meticulous investigation, I have determined that the killer must be...", next: "arrest2"}],
		},
		{
			id: "arrest2",
			body: {
				image: rootURL + "foyer.jpg",
				text: "Everyone is on the edge of their seats."
			},
			choices: [{name:"Continue the dramatic pause", next:"arrest3"}]
		},
		{
			id: "arrest3",
			body: {
				text: "After nearly three minutes of silent anticipation, you sense that your audience is getting impatient.",
				image: rootURL + "foyer.jpg",
			},
			choices: [
				{type:"speech",name:"...the maid."}, 
				{type:"speech",name:"...the butler."},
			   	{type:"speech",name:"...the drifter."}, 
				{type:"speech",name:"...myself."},
			],
		},
		{
			id: "maid",
			body: {
				image: rootURL + "maid.jpg",
				text: (vars) => {
					if (vars.detective === 2) {
						return '"Oh, you must be here about the job opening," says the maid. "I\'m very sorry to break this to you, but Mr. Bryant won\'t be needing a pastry chef anymore, as he is no doubt gorging himself on chocolate lava cake somewhere up in Heaven." \nShe notices your Junior Deputy badge. "Oh, my mistake. You must be the special investigator everyone is talking about. How can I help you?"';
					} else {
						return '"Oh my stars, it\'s world-renowned detective Rutherford S. Godfried!" exclaims the maid. "What an honor! Please, tell me if there is any way I can help you catch the killer."';
					}
				}
			},
			choices: [
				{
					type: "speech",
					name: "Do you know who did it?",
				},
				{
					name: "Get up in leave in the middle of the conversation, like an inconsiderate jerk.",
					next: "foyer"
				}
			]
		},
		{
			id: "butler",
			body: {
				image: rootURL + "butler.jpg",
				text: '"You\'re the detective, right? You\'d better solve this case pronto. Not because I care about that old man, or anything --- I just wanna get out of here so I can ride my chopper on the open road, screaming at the top of my lungs while going a hundred miles per hour." \n Boy, this butler sure is cool and aloof.'
			},
			choices: [
				{type: "speech", name: "Maybe you should keep your mouth closed while riding. You don't want to choke on a bug.", next: "butler_bug"},
				{type: "speech", name: "You seem like a nice boy. I'll leave you alone now so you can do your bicycle ride.", next: "foyer"}
			]
		},
		{
			id: "butler_bug",
			body: {
				image: rootURL + "butler.jpg",
				text: '"So what if I do, punk?" he snarls.'
			},
			choices: [{name:"Today is not a day for death.", next:"butler"}, {name:"Get all up in his face.", next:"butler_fight"}]
		},
		{
			id: "butler_fight",
			body: {
				image: rootURL + "fist.jpg",
				text: "This is not a butler you want to mess around with. As soon as you step into his personal space, he throws out a strong right hook.",
			},
			choices: [{name:"Dodge the punch"}, {name:"Let the punch hit you", next:"butler_fight_respect"}, {name:"Pull out your gun"}]
		},
		{
			id: "butler_fight_respect",
			body: {
				image: rootURL + "pain.jpg",
				text: 'You see the punch coming, but opt to take it right in the gut. God, it hurts. You pray that you won\'t suffer the same fate as your idol, Harry Houdini. \n The butler is impressed. "It takes some guts to not move out of the way of a clearly telegraphed punch," he says. "I can respect that."'
			},
			choices: [{name:"Keep talking to the butler.", next: "butler"}, {name:"Excuse yourself so that you can go cry without embarrassment", next: "foyer"}]
		},
		{
			id: "drifter",
			body: {
				image: rootURL + "killer.jpg",
				text: "You approach the drifter. He does not react."
			},
			choices: [{name:"Leave this weirdo alone.", next:"foyer"}]
		}
	]
}}
