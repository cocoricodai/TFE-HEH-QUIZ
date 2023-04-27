import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class LocalStorageManagerService {
	/**
	 * Save a string item in localStorage
	 * @param localStorageItemName
	 * @param localStorageItemValue
	 */
	public setItemString(
		localStorageItemName: string,
		localStorageItemValue: string
	) {
		localStorage.setItem(localStorageItemName, localStorageItemValue);
	}

	/**
	 * Get string item from localStorage
	 * @param localStorageItemName
	 * @returns
	 */
	public getItemString(localStorageItemName: string): string | null {
		return localStorage.getItem(localStorageItemName);
	}

	/**
	 * Save an object item to localStorage
	 * @param localStorageItemName
	 * @param localStorageItemObject
	 */
	public setItemObject(
		localStorageItemName: string,
		localStorageItemObject: Object
	) {
		localStorage.setItem(
			localStorageItemName,
			JSON.stringify(localStorageItemObject)
		);
	}

	/**
	 * Get object item from localStorage
	 * @param localStorageItemName
	 * @returns
	 */
	public getItemObject(localStorageItemName: string): Object | null {
		const localStorageItemObject = localStorage.getItem(localStorageItemName);
		if (localStorageItemObject) {
			return JSON.parse(localStorageItemObject);
		}
		return null;
	}
}
