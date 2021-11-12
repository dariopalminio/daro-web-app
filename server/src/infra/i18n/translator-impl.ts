import { Injectable, Inject } from '@nestjs/common';
import { ITranslator } from '../../domain/output-port/translator.interface';
import { I18nRequestScopeService } from 'nestjs-i18n';

/**
 * i18n wrapper class
 */
@Injectable()
export class TranslatorImpl implements ITranslator {
    
    constructor(
        @Inject('I18nRequestScopeService')
        private readonly i18n: I18nRequestScopeService,
    ) { }

    /**
     * wrapper of translate
     * @param key 
     * @param options 
     * @returns 
     */
    async translate(key: any, options?: any): Promise<string> {
        return await this.i18n.translate(key, options);
    }

};