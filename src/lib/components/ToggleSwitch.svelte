<label class="switch">
	<input class="switch-icon" type="checkbox" role="switch" aria-checked="false" />
	<span id="switchLabel"><slot /></span>
</label>

<style lang="scss">
	.switch {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		margin: 10px;
		cursor: pointer;

		#switchLabel {
			-webkit-touch-callout: none;
			-webkit-user-select: none;
			-khtml-user-select: none;
			-moz-user-select: none;
			-ms-user-select: none;
			user-select: none;
		}

		.switch-icon {
			appearance: none;
			position: relative;
			border: max(2px, 0.1em) solid gray;
			border-radius: 1.25em;
			width: 2.25em;
			height: 1.25em;
			&::before {
				content: '';
				position: absolute;
				left: 0;
				width: 1em;
				height: 1em;
				border-radius: 50%;
				transform: scale(0.8);
				background-color: gray;
				transition: left 120ms linear;
			}
			&:checked::before {
				background-color: white;
				left: 1em;
			}
			&:checked {
				background-color: var(--accent-color);
				border-color: var(--accent-color);
			}

			&:disabled {
				&:hover {
					border-color: var(--light-gray);
					opacity: 0.7;
					cursor: not-allowed;
				}
				&::before {
					background-color: var(--light-gray);
				}
			}
			+ span {
				&:disabled {
					opacity: 0.7;
					cursor: not-allowed;
				}
			}
			&:enabled:hover {
				box-shadow: 0 0 0 max(3px, 0.2em) var(--light-gray);
			}
		}
	}
</style>
