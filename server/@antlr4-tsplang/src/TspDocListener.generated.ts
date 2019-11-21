// Generated from ./TspDocParser.g4 by ANTLR 4.7.3-SNAPSHOT


import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";

import { NilTypeContext } from "./TspDocParser.generated";
import { BooleanTypeContext } from "./TspDocParser.generated";
import { NumberTypeContext } from "./TspDocParser.generated";
import { StringTypeContext } from "./TspDocParser.generated";
import { FunctionTypeContext } from "./TspDocParser.generated";
import { UserdataTypeContext } from "./TspDocParser.generated";
import { ThreadTypeContext } from "./TspDocParser.generated";
import { TableTypeContext } from "./TspDocParser.generated";
import { NamespaceTypeContext } from "./TspDocParser.generated";
import { AnyTypeContext } from "./TspDocParser.generated";
import { NameTypeContext } from "./TspDocParser.generated";
import { NameRequiredContext } from "./TspDocParser.generated";
import { NameOptionalContext } from "./TspDocParser.generated";
import { Version1Context } from "./TspDocParser.generated";
import { Version2Context } from "./TspDocParser.generated";
import { DocstringContext } from "./TspDocParser.generated";
import { DocblockContext } from "./TspDocParser.generated";
import { DocDeprecatedContext } from "./TspDocParser.generated";
import { DocDescriptionContext } from "./TspDocParser.generated";
import { DocContentContext } from "./TspDocParser.generated";
import { LinkContext } from "./TspDocParser.generated";
import { DocParameterContext } from "./TspDocParser.generated";
import { TypeDeclarationContext } from "./TspDocParser.generated";
import { TypeEntryContext } from "./TspDocParser.generated";
import { TypeUnionContext } from "./TspDocParser.generated";
import { TypeContext } from "./TspDocParser.generated";
import { TypeListContext } from "./TspDocParser.generated";
import { NameDeclarationContext } from "./TspDocParser.generated";
import { NameValueContext } from "./TspDocParser.generated";
import { NumContext } from "./TspDocParser.generated";
import { StrContext } from "./TspDocParser.generated";
import { DocReturnsContext } from "./TspDocParser.generated";
import { DocReadonlyContext } from "./TspDocParser.generated";
import { DocWriteonlyContext } from "./TspDocParser.generated";
import { DocTypeContext } from "./TspDocParser.generated";
import { DocTypedefContext } from "./TspDocParser.generated";
import { DocFieldContext } from "./TspDocParser.generated";
import { DocIndexContext } from "./TspDocParser.generated";
import { DocSeeContext } from "./TspDocParser.generated";
import { SeeTargetContext } from "./TspDocParser.generated";
import { DocTsplinkContext } from "./TspDocParser.generated";
import { DocFirmwareContext } from "./TspDocParser.generated";
import { FirmwareEntryContext } from "./TspDocParser.generated";
import { DocVersionContext } from "./TspDocParser.generated";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `TspDocParser`.
 */
export interface TspDocListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by the `NilType`
	 * labeled alternative in `TspDocParser.type`.
	 * @param ctx the parse tree
	 */
	enterNilType?: (ctx: NilTypeContext) => void;
	/**
	 * Exit a parse tree produced by the `NilType`
	 * labeled alternative in `TspDocParser.type`.
	 * @param ctx the parse tree
	 */
	exitNilType?: (ctx: NilTypeContext) => void;

	/**
	 * Enter a parse tree produced by the `BooleanType`
	 * labeled alternative in `TspDocParser.type`.
	 * @param ctx the parse tree
	 */
	enterBooleanType?: (ctx: BooleanTypeContext) => void;
	/**
	 * Exit a parse tree produced by the `BooleanType`
	 * labeled alternative in `TspDocParser.type`.
	 * @param ctx the parse tree
	 */
	exitBooleanType?: (ctx: BooleanTypeContext) => void;

	/**
	 * Enter a parse tree produced by the `NumberType`
	 * labeled alternative in `TspDocParser.type`.
	 * @param ctx the parse tree
	 */
	enterNumberType?: (ctx: NumberTypeContext) => void;
	/**
	 * Exit a parse tree produced by the `NumberType`
	 * labeled alternative in `TspDocParser.type`.
	 * @param ctx the parse tree
	 */
	exitNumberType?: (ctx: NumberTypeContext) => void;

	/**
	 * Enter a parse tree produced by the `StringType`
	 * labeled alternative in `TspDocParser.type`.
	 * @param ctx the parse tree
	 */
	enterStringType?: (ctx: StringTypeContext) => void;
	/**
	 * Exit a parse tree produced by the `StringType`
	 * labeled alternative in `TspDocParser.type`.
	 * @param ctx the parse tree
	 */
	exitStringType?: (ctx: StringTypeContext) => void;

	/**
	 * Enter a parse tree produced by the `FunctionType`
	 * labeled alternative in `TspDocParser.type`.
	 * @param ctx the parse tree
	 */
	enterFunctionType?: (ctx: FunctionTypeContext) => void;
	/**
	 * Exit a parse tree produced by the `FunctionType`
	 * labeled alternative in `TspDocParser.type`.
	 * @param ctx the parse tree
	 */
	exitFunctionType?: (ctx: FunctionTypeContext) => void;

	/**
	 * Enter a parse tree produced by the `UserdataType`
	 * labeled alternative in `TspDocParser.type`.
	 * @param ctx the parse tree
	 */
	enterUserdataType?: (ctx: UserdataTypeContext) => void;
	/**
	 * Exit a parse tree produced by the `UserdataType`
	 * labeled alternative in `TspDocParser.type`.
	 * @param ctx the parse tree
	 */
	exitUserdataType?: (ctx: UserdataTypeContext) => void;

	/**
	 * Enter a parse tree produced by the `ThreadType`
	 * labeled alternative in `TspDocParser.type`.
	 * @param ctx the parse tree
	 */
	enterThreadType?: (ctx: ThreadTypeContext) => void;
	/**
	 * Exit a parse tree produced by the `ThreadType`
	 * labeled alternative in `TspDocParser.type`.
	 * @param ctx the parse tree
	 */
	exitThreadType?: (ctx: ThreadTypeContext) => void;

	/**
	 * Enter a parse tree produced by the `TableType`
	 * labeled alternative in `TspDocParser.type`.
	 * @param ctx the parse tree
	 */
	enterTableType?: (ctx: TableTypeContext) => void;
	/**
	 * Exit a parse tree produced by the `TableType`
	 * labeled alternative in `TspDocParser.type`.
	 * @param ctx the parse tree
	 */
	exitTableType?: (ctx: TableTypeContext) => void;

	/**
	 * Enter a parse tree produced by the `NamespaceType`
	 * labeled alternative in `TspDocParser.type`.
	 * @param ctx the parse tree
	 */
	enterNamespaceType?: (ctx: NamespaceTypeContext) => void;
	/**
	 * Exit a parse tree produced by the `NamespaceType`
	 * labeled alternative in `TspDocParser.type`.
	 * @param ctx the parse tree
	 */
	exitNamespaceType?: (ctx: NamespaceTypeContext) => void;

	/**
	 * Enter a parse tree produced by the `AnyType`
	 * labeled alternative in `TspDocParser.type`.
	 * @param ctx the parse tree
	 */
	enterAnyType?: (ctx: AnyTypeContext) => void;
	/**
	 * Exit a parse tree produced by the `AnyType`
	 * labeled alternative in `TspDocParser.type`.
	 * @param ctx the parse tree
	 */
	exitAnyType?: (ctx: AnyTypeContext) => void;

	/**
	 * Enter a parse tree produced by the `NameType`
	 * labeled alternative in `TspDocParser.type`.
	 * @param ctx the parse tree
	 */
	enterNameType?: (ctx: NameTypeContext) => void;
	/**
	 * Exit a parse tree produced by the `NameType`
	 * labeled alternative in `TspDocParser.type`.
	 * @param ctx the parse tree
	 */
	exitNameType?: (ctx: NameTypeContext) => void;

	/**
	 * Enter a parse tree produced by the `NameRequired`
	 * labeled alternative in `TspDocParser.nameDeclaration`.
	 * @param ctx the parse tree
	 */
	enterNameRequired?: (ctx: NameRequiredContext) => void;
	/**
	 * Exit a parse tree produced by the `NameRequired`
	 * labeled alternative in `TspDocParser.nameDeclaration`.
	 * @param ctx the parse tree
	 */
	exitNameRequired?: (ctx: NameRequiredContext) => void;

	/**
	 * Enter a parse tree produced by the `NameOptional`
	 * labeled alternative in `TspDocParser.nameDeclaration`.
	 * @param ctx the parse tree
	 */
	enterNameOptional?: (ctx: NameOptionalContext) => void;
	/**
	 * Exit a parse tree produced by the `NameOptional`
	 * labeled alternative in `TspDocParser.nameDeclaration`.
	 * @param ctx the parse tree
	 */
	exitNameOptional?: (ctx: NameOptionalContext) => void;

	/**
	 * Enter a parse tree produced by the `Version1`
	 * labeled alternative in `TspDocParser.docVersion`.
	 * @param ctx the parse tree
	 */
	enterVersion1?: (ctx: Version1Context) => void;
	/**
	 * Exit a parse tree produced by the `Version1`
	 * labeled alternative in `TspDocParser.docVersion`.
	 * @param ctx the parse tree
	 */
	exitVersion1?: (ctx: Version1Context) => void;

	/**
	 * Enter a parse tree produced by the `Version2`
	 * labeled alternative in `TspDocParser.docVersion`.
	 * @param ctx the parse tree
	 */
	enterVersion2?: (ctx: Version2Context) => void;
	/**
	 * Exit a parse tree produced by the `Version2`
	 * labeled alternative in `TspDocParser.docVersion`.
	 * @param ctx the parse tree
	 */
	exitVersion2?: (ctx: Version2Context) => void;

	/**
	 * Enter a parse tree produced by `TspDocParser.docstring`.
	 * @param ctx the parse tree
	 */
	enterDocstring?: (ctx: DocstringContext) => void;
	/**
	 * Exit a parse tree produced by `TspDocParser.docstring`.
	 * @param ctx the parse tree
	 */
	exitDocstring?: (ctx: DocstringContext) => void;

	/**
	 * Enter a parse tree produced by `TspDocParser.docblock`.
	 * @param ctx the parse tree
	 */
	enterDocblock?: (ctx: DocblockContext) => void;
	/**
	 * Exit a parse tree produced by `TspDocParser.docblock`.
	 * @param ctx the parse tree
	 */
	exitDocblock?: (ctx: DocblockContext) => void;

	/**
	 * Enter a parse tree produced by `TspDocParser.docDeprecated`.
	 * @param ctx the parse tree
	 */
	enterDocDeprecated?: (ctx: DocDeprecatedContext) => void;
	/**
	 * Exit a parse tree produced by `TspDocParser.docDeprecated`.
	 * @param ctx the parse tree
	 */
	exitDocDeprecated?: (ctx: DocDeprecatedContext) => void;

	/**
	 * Enter a parse tree produced by `TspDocParser.docDescription`.
	 * @param ctx the parse tree
	 */
	enterDocDescription?: (ctx: DocDescriptionContext) => void;
	/**
	 * Exit a parse tree produced by `TspDocParser.docDescription`.
	 * @param ctx the parse tree
	 */
	exitDocDescription?: (ctx: DocDescriptionContext) => void;

	/**
	 * Enter a parse tree produced by `TspDocParser.docContent`.
	 * @param ctx the parse tree
	 */
	enterDocContent?: (ctx: DocContentContext) => void;
	/**
	 * Exit a parse tree produced by `TspDocParser.docContent`.
	 * @param ctx the parse tree
	 */
	exitDocContent?: (ctx: DocContentContext) => void;

	/**
	 * Enter a parse tree produced by `TspDocParser.link`.
	 * @param ctx the parse tree
	 */
	enterLink?: (ctx: LinkContext) => void;
	/**
	 * Exit a parse tree produced by `TspDocParser.link`.
	 * @param ctx the parse tree
	 */
	exitLink?: (ctx: LinkContext) => void;

	/**
	 * Enter a parse tree produced by `TspDocParser.docParameter`.
	 * @param ctx the parse tree
	 */
	enterDocParameter?: (ctx: DocParameterContext) => void;
	/**
	 * Exit a parse tree produced by `TspDocParser.docParameter`.
	 * @param ctx the parse tree
	 */
	exitDocParameter?: (ctx: DocParameterContext) => void;

	/**
	 * Enter a parse tree produced by `TspDocParser.typeDeclaration`.
	 * @param ctx the parse tree
	 */
	enterTypeDeclaration?: (ctx: TypeDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `TspDocParser.typeDeclaration`.
	 * @param ctx the parse tree
	 */
	exitTypeDeclaration?: (ctx: TypeDeclarationContext) => void;

	/**
	 * Enter a parse tree produced by `TspDocParser.typeEntry`.
	 * @param ctx the parse tree
	 */
	enterTypeEntry?: (ctx: TypeEntryContext) => void;
	/**
	 * Exit a parse tree produced by `TspDocParser.typeEntry`.
	 * @param ctx the parse tree
	 */
	exitTypeEntry?: (ctx: TypeEntryContext) => void;

	/**
	 * Enter a parse tree produced by `TspDocParser.typeUnion`.
	 * @param ctx the parse tree
	 */
	enterTypeUnion?: (ctx: TypeUnionContext) => void;
	/**
	 * Exit a parse tree produced by `TspDocParser.typeUnion`.
	 * @param ctx the parse tree
	 */
	exitTypeUnion?: (ctx: TypeUnionContext) => void;

	/**
	 * Enter a parse tree produced by `TspDocParser.type`.
	 * @param ctx the parse tree
	 */
	enterType?: (ctx: TypeContext) => void;
	/**
	 * Exit a parse tree produced by `TspDocParser.type`.
	 * @param ctx the parse tree
	 */
	exitType?: (ctx: TypeContext) => void;

	/**
	 * Enter a parse tree produced by `TspDocParser.typeList`.
	 * @param ctx the parse tree
	 */
	enterTypeList?: (ctx: TypeListContext) => void;
	/**
	 * Exit a parse tree produced by `TspDocParser.typeList`.
	 * @param ctx the parse tree
	 */
	exitTypeList?: (ctx: TypeListContext) => void;

	/**
	 * Enter a parse tree produced by `TspDocParser.nameDeclaration`.
	 * @param ctx the parse tree
	 */
	enterNameDeclaration?: (ctx: NameDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `TspDocParser.nameDeclaration`.
	 * @param ctx the parse tree
	 */
	exitNameDeclaration?: (ctx: NameDeclarationContext) => void;

	/**
	 * Enter a parse tree produced by `TspDocParser.nameValue`.
	 * @param ctx the parse tree
	 */
	enterNameValue?: (ctx: NameValueContext) => void;
	/**
	 * Exit a parse tree produced by `TspDocParser.nameValue`.
	 * @param ctx the parse tree
	 */
	exitNameValue?: (ctx: NameValueContext) => void;

	/**
	 * Enter a parse tree produced by `TspDocParser.num`.
	 * @param ctx the parse tree
	 */
	enterNum?: (ctx: NumContext) => void;
	/**
	 * Exit a parse tree produced by `TspDocParser.num`.
	 * @param ctx the parse tree
	 */
	exitNum?: (ctx: NumContext) => void;

	/**
	 * Enter a parse tree produced by `TspDocParser.str`.
	 * @param ctx the parse tree
	 */
	enterStr?: (ctx: StrContext) => void;
	/**
	 * Exit a parse tree produced by `TspDocParser.str`.
	 * @param ctx the parse tree
	 */
	exitStr?: (ctx: StrContext) => void;

	/**
	 * Enter a parse tree produced by `TspDocParser.docReturns`.
	 * @param ctx the parse tree
	 */
	enterDocReturns?: (ctx: DocReturnsContext) => void;
	/**
	 * Exit a parse tree produced by `TspDocParser.docReturns`.
	 * @param ctx the parse tree
	 */
	exitDocReturns?: (ctx: DocReturnsContext) => void;

	/**
	 * Enter a parse tree produced by `TspDocParser.docReadonly`.
	 * @param ctx the parse tree
	 */
	enterDocReadonly?: (ctx: DocReadonlyContext) => void;
	/**
	 * Exit a parse tree produced by `TspDocParser.docReadonly`.
	 * @param ctx the parse tree
	 */
	exitDocReadonly?: (ctx: DocReadonlyContext) => void;

	/**
	 * Enter a parse tree produced by `TspDocParser.docWriteonly`.
	 * @param ctx the parse tree
	 */
	enterDocWriteonly?: (ctx: DocWriteonlyContext) => void;
	/**
	 * Exit a parse tree produced by `TspDocParser.docWriteonly`.
	 * @param ctx the parse tree
	 */
	exitDocWriteonly?: (ctx: DocWriteonlyContext) => void;

	/**
	 * Enter a parse tree produced by `TspDocParser.docType`.
	 * @param ctx the parse tree
	 */
	enterDocType?: (ctx: DocTypeContext) => void;
	/**
	 * Exit a parse tree produced by `TspDocParser.docType`.
	 * @param ctx the parse tree
	 */
	exitDocType?: (ctx: DocTypeContext) => void;

	/**
	 * Enter a parse tree produced by `TspDocParser.docTypedef`.
	 * @param ctx the parse tree
	 */
	enterDocTypedef?: (ctx: DocTypedefContext) => void;
	/**
	 * Exit a parse tree produced by `TspDocParser.docTypedef`.
	 * @param ctx the parse tree
	 */
	exitDocTypedef?: (ctx: DocTypedefContext) => void;

	/**
	 * Enter a parse tree produced by `TspDocParser.docField`.
	 * @param ctx the parse tree
	 */
	enterDocField?: (ctx: DocFieldContext) => void;
	/**
	 * Exit a parse tree produced by `TspDocParser.docField`.
	 * @param ctx the parse tree
	 */
	exitDocField?: (ctx: DocFieldContext) => void;

	/**
	 * Enter a parse tree produced by `TspDocParser.docIndex`.
	 * @param ctx the parse tree
	 */
	enterDocIndex?: (ctx: DocIndexContext) => void;
	/**
	 * Exit a parse tree produced by `TspDocParser.docIndex`.
	 * @param ctx the parse tree
	 */
	exitDocIndex?: (ctx: DocIndexContext) => void;

	/**
	 * Enter a parse tree produced by `TspDocParser.docSee`.
	 * @param ctx the parse tree
	 */
	enterDocSee?: (ctx: DocSeeContext) => void;
	/**
	 * Exit a parse tree produced by `TspDocParser.docSee`.
	 * @param ctx the parse tree
	 */
	exitDocSee?: (ctx: DocSeeContext) => void;

	/**
	 * Enter a parse tree produced by `TspDocParser.seeTarget`.
	 * @param ctx the parse tree
	 */
	enterSeeTarget?: (ctx: SeeTargetContext) => void;
	/**
	 * Exit a parse tree produced by `TspDocParser.seeTarget`.
	 * @param ctx the parse tree
	 */
	exitSeeTarget?: (ctx: SeeTargetContext) => void;

	/**
	 * Enter a parse tree produced by `TspDocParser.docTsplink`.
	 * @param ctx the parse tree
	 */
	enterDocTsplink?: (ctx: DocTsplinkContext) => void;
	/**
	 * Exit a parse tree produced by `TspDocParser.docTsplink`.
	 * @param ctx the parse tree
	 */
	exitDocTsplink?: (ctx: DocTsplinkContext) => void;

	/**
	 * Enter a parse tree produced by `TspDocParser.docFirmware`.
	 * @param ctx the parse tree
	 */
	enterDocFirmware?: (ctx: DocFirmwareContext) => void;
	/**
	 * Exit a parse tree produced by `TspDocParser.docFirmware`.
	 * @param ctx the parse tree
	 */
	exitDocFirmware?: (ctx: DocFirmwareContext) => void;

	/**
	 * Enter a parse tree produced by `TspDocParser.firmwareEntry`.
	 * @param ctx the parse tree
	 */
	enterFirmwareEntry?: (ctx: FirmwareEntryContext) => void;
	/**
	 * Exit a parse tree produced by `TspDocParser.firmwareEntry`.
	 * @param ctx the parse tree
	 */
	exitFirmwareEntry?: (ctx: FirmwareEntryContext) => void;

	/**
	 * Enter a parse tree produced by `TspDocParser.docVersion`.
	 * @param ctx the parse tree
	 */
	enterDocVersion?: (ctx: DocVersionContext) => void;
	/**
	 * Exit a parse tree produced by `TspDocParser.docVersion`.
	 * @param ctx the parse tree
	 */
	exitDocVersion?: (ctx: DocVersionContext) => void;
}

